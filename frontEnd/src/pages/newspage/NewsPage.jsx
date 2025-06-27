// src/pages/NewsPage.jsx

import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { NewsItem } from "../../component/newsItem/NewsItem";
import { API_BASE } from "../../services/api";
import { LatestNews } from "../../component/latestnews/Latest";
import { FakeAd } from "../../component/fakeAd/FakeAd";
import { Container } from "../../component/container/Container";
import { NewsContext } from "../../context/NewsContext";

export const NewsPage = () => {
    const { slug } = useParams();
    const [categoryId, setCategoryId] = useState(null);
    const [posts, setPosts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const { TenPopularPosts,fetchPopularPosts } = useContext(NewsContext)

    // گرفتن آی‌دی دسته با استفاده از slug
    useEffect(() => {
        const fetchCategoryId = async () => {
            try {
                const res = await axios.get(
                    `${API_BASE}/categories?slug=${slug}`
                );
                if (res.data.length > 0) {
                    setCategoryId(res.data[0].id);
                    setCategoryName(res.data[0].name);
                }
            } catch (err) {
                console.error("خطا در دریافت دسته:", err);
            }
        };

        fetchCategoryId();
    }, [slug]);

    //   گرفتن پست‌های مربوط به هر دسته و پربازدیدترین ها
    useEffect(() => {
        const fetchPosts = async () => {
            if (!categoryId) return;
            try {
                const res = await axios.get(
                    `${API_BASE}/posts?categories=${categoryId}&_embed`
                );
                setPosts(res.data);
            } catch (err) {
                console.error("خطا در دریافت پست‌ها:", err);
            }
        };

        fetchPosts();
        fetchPopularPosts();
    }, [categoryId]);


    return (
        <Container>
            <div className="grid grid-cols-4 bg-amber-50 px-1 mt-12" dir="rtl">
                <div className="container pb-10 pt-14 px-4 col-span-3" dir="rtl">
                    <h1 className="text-3xl font-bold text-blue-800 mb-8 border-b pb-2">
                        خبرهای {categoryName}
                    </h1>

                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {posts.map((item) => (
                                <Link to={`/singlenews/${item.id}`} key={item.id}>
                                    <NewsItem
                                        key={item.id}
                                        img={
                                            item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                                            "https://via.placeholder.com/300"
                                        }
                                        title={item.title?.rendered || "بدون عنوان"}
                                        description={
                                            item.excerpt?.rendered || "توضیحی برای این خبر ثبت نشده است."
                                        }
                                        date={item.date}
                                    />
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center mt-20">خبری برای این دسته وجود ندارد.</p>
                    )}
                </div>
                <div className="col-span-1 mt-24">
                    <div className="mb-1">
                        <FakeAd />

                    </div>
                    <div className="mx-0">
                        <h1 className="pr-5 pl-6 pb-1 text-red-500 font-extrabold  text-3xl border-red-500 border-b-4 mr-2 mt-6">
                            پربازدید ترین ها
                        </h1>
                        <LatestNews posts={TenPopularPosts} />
                    </div>


                </div>
            </div>
        </Container>
    );
};
