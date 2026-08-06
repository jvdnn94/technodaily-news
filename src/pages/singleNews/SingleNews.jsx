import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "../../component/container/Container";
import { GetSinglePost } from "../../services/api";
import { ShareIcon } from "@heroicons/react/16/solid";
import { FakeAd2 } from "../../component/fakeAd/FakeAd2";
import { FakeAd } from "../../component/fakeAd/FakeAd";
import { LikeDislike } from "../../component/likeDislike/LikeDislikeComponent";

export const SingleNews = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPost = async () => {
      try {
        const data = await GetSinglePost(id);
        if (isMounted) setPost(data);
      } catch (error) {
        console.error("خطا در دریافت پست:", error);
      }
    };

    fetchPost();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (!post) {
    return (
      <Container>
        <p className="text-center text-gray-600 pt-20 min-h-[62vh] text-base sm:text-lg">
          ...در حال بارگزاری خبر
        </p>
      </Container>
    );
  }

  // استخراج اطلاعات با مقدار پیش‌فرض
  const categoryName =
    post._embedded?.["wp:term"]?.[0]?.[0]?.name || "بدون دسته";
  const authorName = post._embedded?.author?.[0]?.name || "نویسنده ناشناس";
  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "https://via.placeholder.com/800x400";

  return (
    <Container>
      <div
        className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6 mt-16 bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden"
        dir="rtl"
      >
        {/* محتوای اصلی */}
        <div className="lg:col-span-3 p-4 sm:p-6 md:p-8">
          {/* بخش تصویر و عنوان */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* تصویر خبر */}
            <div className="order-1 md:order-2">
              <img
                src={featuredImage}
                alt={post.title?.rendered || "تصویر خبر"}
                className="rounded-2xl w-full max-h-[400px] object-cover shadow-md"
              />
            </div>

            {/* عنوان و اطلاعات */}
            <div className="order-2 md:order-1 text-right flex flex-col justify-between">
              <div>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full mb-3">
                  {categoryName}
                </span>
                <h1
                  className="font-bold text-2xl sm:text-3xl md:text-4xl mb-4 text-gray-900 leading-tight"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-600 text-sm sm:text-base">
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {new Date(post.date).toLocaleDateString("fa-IR")}
                </span>
                <span className="hidden sm:inline text-gray-300">|</span>
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {authorName}
                </span>
              </div>
            </div>
          </div>

          {/* متن خبر */}
          <div
            dir="rtl"
            className="max-w-none text-right leading-relaxed custom-prose text-gray-800 mt-6 text-base md:text-lg"
            style={{ unicodeBidi: "plaintext" }}
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* لایک / اشتراک گذاری */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-200 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium text-base">
                این محتوا را پسندیدید؟
              </span>
              <LikeDislike />
            </div>
            <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm">
              <ShareIcon className="w-5 h-5" />
              اشتراک‌گذاری
            </button>
          </div>

          {/* تبلیغ دوم */}
          <div className="w-full mt-8">
            <FakeAd2 />
          </div>
        </div>

        {/* ستون تبلیغات */}
        <div className="lg:col-span-1 px-4 sm:px-6 py-4 sm:py-6 bg-gray-50 rounded-b-2xl lg:rounded-bl-2xl lg:rounded-br-none">
          <div className="sticky top-20 space-y-6">
            <FakeAd />
            {/* در صورت نیاز تبلیغات بیشتر */}
            <div className="hidden lg:block">
              <FakeAd />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};