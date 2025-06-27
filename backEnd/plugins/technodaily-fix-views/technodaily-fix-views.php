<?php
/**
 * Plugin Name: Technodaily Popular Posts Support
 */

add_action('rest_api_init', function () {
    register_rest_field('post', 'views', array(
        'get_callback' => function ($post_arr) {
            return get_post_meta($post_arr['id'], 'post_views_count', true);
        },
        'schema' => null,
    ));
});

// اجازه استفاده از meta_key برای مرتب‌سازی
add_filter('rest_post_query', function ($args, $request) {
    if (
        isset($request['orderby']) &&
        $request['orderby'] === 'meta_value_num' &&
        isset($request['meta_key'])
    ) {
        $args['orderby'] = 'meta_value_num';
        $args['meta_key'] = sanitize_text_field($request['meta_key']);
    }
    return $args;
}, 10, 2);

// افزودن مقدار meta_value_num به لیست مجاز پارامتر orderby
add_filter('rest_endpoints', function ($endpoints) {
    if (isset($endpoints['/wp/v2/posts'])) {
        foreach ($endpoints['/wp/v2/posts'] as &$endpoint) {
            if (isset($endpoint['args']['orderby']['enum'])) {
                $endpoint['args']['orderby']['enum'][] = 'meta_value_num';
            }
        }
    }
    return $endpoints;
});
