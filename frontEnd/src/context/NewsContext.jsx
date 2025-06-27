import axios from "axios";
import { createContext, useState } from "react";
import { API_BASE } from "../services/api";
import { useNavigate } from "react-router-dom";

export const NewsContext = createContext(null);

export const NewsContextProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [editingPost, setEditingPost] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategorySlug, setNewCategorySlug] = useState("");
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [activeSection, setActiveSection] = useState("categories");
    const [users, setUsers] = useState([]);
    const [filteredCategoryId, setFilteredCategoryId] = useState(null);
    //استیت های صفحه اصلی
    const [FilteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sliderPosts, setSliderPosts] = useState([]);

    const token = localStorage.getItem("token");


    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_BASE.replace('/wp/v2', '')}/custom/v1/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            setUsers(response.data);
            console.log("کاربران دریافتی:", response.data);
        } catch (error) {
            console.error("خطا در دریافت کاربران:", error);
        }
    };

    const fetchPosts = async (categoryId = null) => {
        try {
            let url = `${API_BASE}/posts?_embed&per_page=100`;
            if (categoryId) {
                url += `&categories=${categoryId}`;
            }
            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPosts(res.data);
        } catch (err) {
            console.error("خطا در دریافت پست‌ها:", err);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${API_BASE}/categories?per_page=100`);
            setCategories(res.data);
        } catch (err) {
            console.error("خطا در دریافت دسته‌بندی‌ها:", err);
        }
    };

    const uploadImage = async (file, token) => {
        const formData = new FormData();
        formData.append("file", file, file.name || "image.jpg");

        try {
            const response = await axios.post(`${API_BASE}/media`, formData, {
                headers: {
                    "Content-Disposition": `attachment; filename="${file.name || 'image.jpg'}"`,
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.id;
        } catch (error) {
            console.error("خطا در آپلود تصویر:", error);
            return null;
        }
    };



    const handleSubmit = async (e) => {
        let mediaId = editingPost?.featured_media || null;
        e.preventDefault();
        try {

            if (imageFile) {
                const uploadedId = await uploadImage(imageFile, token);
                if (uploadedId) {
                    mediaId = uploadedId;
                } else {
                    alert("آپلود تصویر با خطا مواجه شد.");
                    return;
                }
            }

            const payload = {
                title,
                content,
                status: "publish",
                featured_media: mediaId || 0,
                categories: selectedCategory ? [parseInt(selectedCategory)] : [],  // 👈 اضافه شده
            };

            if (editingPost) {
                await axios.put(`${API_BASE}/posts/${editingPost.id}`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
            } else {
                await axios.post(`${API_BASE}/posts`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
            }

            setTitle("");
            setContent("");
            setImageFile(null);
            setImagePreview(null);
            setEditingPost(null);
            fetchPosts();
        } catch (err) {
            console.error("خطا در ارسال یا ویرایش پست:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("آیا از حذف این پست مطمئن هستید؟")) return;
        try {
            await axios.delete(`${API_BASE}/posts/${id}?force=true`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchPosts();
        } catch (err) {
            console.error("خطا در حذف پست:", err);
        }
    };


    const handleEdit = (post) => {
        setTitle(post.title.rendered);
        setContent(post.content.rendered);
        setEditingPost(post);

        if (
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
        ) {
            setImagePreview(post._embedded["wp:featuredmedia"][0].source_url);
        } else {
            setImagePreview(null);
        }

        setImageFile(null);

    };

    const handleAddCategory = async (name, slug) => {
        try {
            await axios.post(
                `${API_BASE}/categories`,
                { name, slug },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setNewCategoryName("");
            setNewCategorySlug("");
            fetchCategories();
        } catch (error) {
            console.error("خطا در افزودن دسته‌بندی:", error);
        }
    };

    const handleUpdateCategory = async (id, name, slug) => {
        try {
            await axios.put(
                `${API_BASE}/categories/${id}`,
                { name, slug },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchCategories();
            setEditCategoryId(null);
            setNewCategoryName("");
            setNewCategorySlug("");
        } catch (error) {
            console.error("خطا در ویرایش دسته‌بندی:", error);
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm("آیا از حذف این دسته‌بندی مطمئن هستید؟")) return;
        try {
            await axios.delete(`${API_BASE}/categories/${id}?force=true`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchCategories();
        } catch (error) {
            console.error("خطا در حذف دسته‌بندی:", error);
        }
    };

    const handleDeleteUser = async (userId) => {
        const confirmed = window.confirm("آیا مطمئن هستید که می‌خواهید این کاربر را حذف کنید؟");
        if (!confirmed) return;

        try {
            await axios.delete(`${API_BASE}/users/${userId}?reassign=1&force=true`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUsers((prev) => prev.filter((user) => user.id !== userId));
        } catch (error) {
            console.error("خطا در حذف کاربر:", error);
            alert("حذف کاربر انجام نشد. لطفاً بررسی کنید که توکن معتبر است و دسترسی کافی دارید.");
        }
    };

    const rolesList = [
        { label: "مشترک", value: "subscriber" },
        { label: "مشارکت‌کننده", value: "contributor" },
        { label: "نویسنده", value: "author" },
        { label: "ویرایشگر", value: "editor" },
        { label: "مدیرکل", value: "administrator" },
    ];

    const handleChangeRole = async (userId, newRole) => {
        try {
            await axios.post(
                `${API_BASE}/users/${userId}`,
                { roles: [newRole] },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchUsers();
        } catch (error) {
            console.error("خطا در تغییر نقش کاربر:", error);
        }
    };

    const handleFilterByCategory = (catId) => {
        setFilteredCategoryId(catId);
        fetchPosts(catId);
    };

    //ثابت های صفحه اصلی
    const latestPosts = posts.slice(0, 16);

    const POSTS_PER_PAGE = 10;


    //توابع و ثابت های صفحه ثبت نام و ورود
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        usernameOrEmail: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const clearForm = () => {
        setFormData({
            usernameOrEmail: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "https://testapi.jnazarinezhad.host.webr.ir/wp-json/jwt-auth/v1/token",
                {
                    username: formData.usernameOrEmail,
                    password: formData.password,
                }
            );

            const token = response.data.token;
            localStorage.setItem("token", token);
            setMessage("ورود با موفقیت انجام شد ✅");

            const userInfo = await axios.get(
                "https://testapi.jnazarinezhad.host.webr.ir/wp-json/wp/v2/users/me",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const roles = userInfo?.data?.roles || [];
            console.log("نقش‌های دریافت‌شده:", roles);  // صرفا برای دیباگ کردن
            localStorage.setItem("roles", JSON.stringify(roles));
            const userLogined = userInfo?.data?.name;
            localStorage.setItem("userName", userLogined);
            // هدایت بسته به نقش
            if (
                roles.includes("administrator") ||
                roles.includes("مدیرکل") ||
                roles.includes("author") ||
                roles.includes("نویسنده")
            ) {
                navigate("/adminpage");
            } else {
                navigate("/");
            }

            clearForm();
        } catch (err) {
            console.error(err);
            setMessage("ورود ناموفق بود ❌");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setMessage("رمزها مطابقت ندارند ❌");
            return;
        }
        const isValidUsername = /^[a-zA-Z0-9_.-]+$/.test(formData.username);
        if (!isValidUsername) {
            setMessage("نام کاربری فقط می‌تواند شامل حروف لاتین، عدد، نقطه یا خط زیر باشد ❌");
            return;
        }

        try {
            const response2 = await axios.post(
                "https://testapi.jnazarinezhad.host.webr.ir/wp-json/custom/v1/register",
                {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            console.log("ثبت‌نام:", response2.data);
            setMessage("ثبت‌نام موفقیت‌آمیز بود ✅");

            setIsLogin(true);
            clearForm();
        } catch (err) {
            console.error("خطا:", err);
            if (err.response && err.response.data) {
                const errorData = err.response.data;
                const errorMessage = typeof errorData === "string"
                    ? errorData
                    : JSON.stringify(errorData);
                setMessage("خطا در ثبت‌نام: " + errorMessage);
            } else {
                setMessage("خطا در ثبت‌نام ❌");
            }
        }
    };

     const [PopularPosts, setPopularPosts] = useState();

    const fetchPopularPosts = async () => {
        try {
            const res = await axios.get(
                `${API_BASE}/posts?_embed&per_page=14&orderby=meta_value_num&meta_key=post_views_count&order=desc`
            );
            setPopularPosts(res.data); //  یا هر متدی که  برای ذخیره اطلاعات وجود داردی
        } catch (error) {
            console.error("خطا در دریافت پست‌های پربازدید:", error);
        }
    };

      const [specialPosts, setspecialPosts] = useState();

    const fetchspecialPosts = async () => {
        try {
            const res = await axios.get(
                `${API_BASE}/posts?_embed&per_page=2&orderby=meta_value_num&meta_key=post_views_count&order=desc`
            );
            setspecialPosts(res.data); //  یا هر متدی که  برای ذخیره اطلاعات وجود داردی
        } catch (error) {
            console.error("خطا در دریافت پست‌های پربازدید:", error);
        }
    };
   
   
   

    const ContextValue = {
        posts, setPosts, title, setTitle, content, setContent, imageFile, setImageFile, imagePreview, setImagePreview, editingPost,
        setEditingPost,categories,setCategories,selectedCategory,setSelectedCategory, newCategoryName, setNewCategoryName, newCategorySlug,
        setNewCategorySlug, editCategoryId, setActiveSection, activeSection, setEditCategoryId, users, setUsers, filteredCategoryId, setFilteredCategoryId,
         fetchUsers,fetchPosts, token, fetchCategories, uploadImage, handleSubmit, handleDelete, handleEdit, handleDeleteUser, handleDeleteCategory,
        handleUpdateCategory, handleAddCategory, rolesList, handleChangeRole, handleFilterByCategory, FilteredPosts, setFilteredPosts, sliderPosts,
        setSliderPosts, loading, setLoading, error, setError, latestPosts, POSTS_PER_PAGE, isLogin, setIsLogin, formData, setFormData, message, setMessage,
        handleChange, clearForm, handleLogin, handleRegister, fetchPopularPosts,PopularPosts,fetchspecialPosts,specialPosts
    };

    return <NewsContext.Provider value={ContextValue}>{props.children}</NewsContext.Provider>
}