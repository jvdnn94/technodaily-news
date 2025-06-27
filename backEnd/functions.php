<?php
/**
 * Twenty Twenty-Four functions and definitions
 * @package Twenty Twenty-Four
 */

// -----------------------------
// Custom Modifications for Project
// -----------------------------

// ✅ افزودن URL تصویر شاخص به خروجی REST API پست‌ها
add_filter('rest_prepare_post', function ($data, $post, $context) {
	if (has_post_thumbnail($post->ID)) {
		$image_id = get_post_thumbnail_id($post->ID);
		$image_url = wp_get_attachment_image_src($image_id, 'full');
		$data->data['featured_image_url'] = $image_url[0];
	}
	return $data;
}, 10, 3);

// ✅ جلوگیری از کراپ خودکار تصاویر وردپرس
add_filter('big_image_size_threshold', '__return_false');
add_filter('intermediate_image_sizes_advanced', '__return_empty_array');

// ✅ فعال‌سازی CORS برای ساب‌دامین React
add_action('rest_api_init', function () {
	remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
	add_filter('rest_pre_serve_request', function ($value) {
		$allowed_origins = [
			'http://localhost:5173',
			'http://test-react.jnazarinezhad.host.webr.ir',
			'https://test-react.jnazarinezhad.host.webr.ir',
		];

		$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

		if (in_array($origin, $allowed_origins)) {
			header("Access-Control-Allow-Origin: $origin");
			header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
			header("Access-Control-Allow-Credentials: true");
			header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Content-Disposition");
		}

		if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
			exit;
		}

		return $value;
	});
}, 15);

// ✅ API سفارشی برای ثبت‌نام کاربر با نقش subscriber
add_action('rest_api_init', function () {
	register_rest_route('custom/v1', '/register', array(
		'methods' => 'POST',
		'callback' => 'custom_user_registration',
		'permission_callback' => '__return_true',
	));
});

function custom_user_registration($request) {
	$params = $request->get_json_params();

	$username = sanitize_text_field($params['username'] ?? '');
	$email = sanitize_email($params['email'] ?? '');
	$password = $params['password'] ?? '';

	if (empty($username) || empty($email) || empty($password)) {
		return new WP_Error('missing_fields', 'تمام فیلدها الزامی هستند.', array('status' => 400));
	}

	if (username_exists($username) || email_exists($email)) {
		return new WP_Error('user_exists', 'نام کاربری یا ایمیل قبلاً ثبت شده.', array('status' => 409));
	}

	$user_id = wp_create_user($username, $password, $email);

	if (is_wp_error($user_id)) {
		return new WP_Error('registration_failed', $user_id->get_error_message(), array('status' => 500));
	}

	// ✅ ست کردن نقش پیش‌فرض
	$user = new WP_User($user_id);
	$user->set_role('subscriber');

	return array(
		'code' => 'registration_successful',
		'message' => 'ثبت‌نام با موفقیت انجام شد.',
		'user_id' => $user_id
	);
}

// ✅ افزودن نقش‌های کاربر به خروجی REST فقط برای خودش
add_filter('rest_prepare_user', function ($response, $user, $request) {
	$current_user_id = get_current_user_id();
	if ($user->ID === $current_user_id) {
		$response->data['roles'] = $user->roles;
	}
	return $response;
}, 10, 3);

// ✅ API برای دریافت لیست کامل کاربران برای مدیر سایت
add_action('rest_api_init', function () {
	register_rest_route('custom/v1', '/users', array(
		'methods' => 'GET',
		'callback' => 'get_all_users_with_details',
		'permission_callback' => function () {
			return current_user_can('list_users');
		}
	));
});

function get_all_users_with_details() {
	$users = get_users();
	$results = [];

	foreach ($users as $user) {
		$results[] = [
			'id' => $user->ID,
			'username' => $user->user_login,
			'name' => $user->display_name,
			'email' => $user->user_email,
			'roles' => $user->roles,
		];
	}

	return $results;
}



add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/delete-user/(?P<id>\d+)', array(
        'methods' => 'DELETE',
        'callback' => 'custom_delete_user',
        'permission_callback' => function () {
            return current_user_can('delete_users');
        }
    ));
});

function custom_delete_user($request) {
    $user_id = intval($request['id']);

    if (get_current_user_id() == $user_id) {
        return new WP_Error('cannot_delete_self', 'شما نمی‌توانید خودتان را حذف کنید.', array('status' => 403));
    }

    if (!get_user_by('id', $user_id)) {
        return new WP_Error('user_not_found', 'کاربر مورد نظر یافت نشد.', array('status' => 404));
    }

    $result = wp_delete_user($user_id, 1); // انتقال پست‌ها به کاربر با ID 1 (معمولاً admin)

    if ($result) {
        return ['deleted' => true];
    }

    return new WP_Error('delete_failed', 'حذف کاربر با خطا مواجه شد.', array('status' => 500));
}



