import React, { useContext, useEffect } from "react";
import { NewsItem } from "../../component/newsItem/NewsItem";
import { Link } from "react-router-dom";
import { GetCategories, GetPostsData } from "../../services/api";
import { SliderComponent } from "../../component/sliderComponent/SliderComponent";
import { LatestNews } from "../../component/latestnews/Latest";
import { FakeAd } from "../../component/fakeAd/FakeAd";
import { FakeAd2 } from "../../component/fakeAd/FakeAd2";
import { FakeAd3 } from "../../component/fakeAd/FakedAd3";
import { NewsContext } from "../../context/NewsContext";
import { SpecialItem } from "../../component/specialItem/SpecialItem";
import Banner from "../../assets/images/NewBanner.png";

/* ---------- helper: تخمین زمان مطالعه ---------- */
const getReadingTime = (excerpt) => {
  const words = (excerpt || "").replace(/<[^>]+>/g, "").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

/* ---------- helper: تاریخ فارسی کوتاه ---------- */
const formatDate = (date) => {
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  } catch {
    return "";
  }
};

export const Home = () => {
  const {
    posts, setPosts, setFilteredPosts, FilteredPosts, loading, setLoading,
    sliderPosts, setSliderPosts, error, setError, setCategories, categories, latestPosts,
  } = useContext(NewsContext);

  useEffect(() => {
    Promise.all([GetPostsData(), GetCategories()])
      .then(([postsResult, catsResult]) => {
        const selectedCats = catsResult.filter(cat => cat.slug !== "uncategorized");
        setPosts(postsResult);
        setCategories(selectedCats);
        setFilteredPosts(postsResult);
        setLoading(false);

        const firstPosts = selectedCats.map((cat) => {
          const firstPost = postsResult.find((post) =>
            post.categories?.some((c) => Number(c) === Number(cat.id))
          );
          return firstPost ? { ...firstPost, categoryName: cat.name } : null;
        }).filter(Boolean);

        setSliderPosts(firstPosts);
      })
      .catch((err) => {
        console.error("خطا در دریافت اطلاعات:", err);
        setError("مشکلی در دریافت اخبار به وجود آمده است.");
        setLoading(false);
      });
  }, []);

  /* ---------- Skeleton ---------- */
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div dir="rtl" className="bg-gray-50 pb-16">
          <div className="w-full h-[440px] sm:h-[520px] lg:h-[600px] rounded-b-3xl bg-gradient-to-br from-blue-100 via-gray-100 to-blue-50 animate-pulse" />
          <div className="mt-8 w-full h-[300px] sm:h-[380px] lg:h-[460px] rounded-2xl bg-gray-100 animate-pulse" />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="lg:col-span-3 space-y-14">
              {[0, 1].map((i) => (
                <div key={i} className="space-y-5">
                  <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[0, 1, 2, 3].map((j) => (
                      <div key={j} className="rounded-2xl overflow-hidden ring-1 ring-gray-100 bg-white">
                        <div className="aspect-video bg-gray-100 animate-pulse" />
                        <div className="p-4 space-y-3">
                          <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
                          <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-1 space-y-6">
              <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
              <div className="h-80 bg-gray-100 rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Error ---------- */
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div dir="rtl" className="min-h-[70vh] flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-3xl ring-1 ring-gray-100 shadow-sm p-8 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">خطایی رخ داد</h2>
            <p className="text-gray-600 text-sm mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-gradient-to-l from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-sm font-medium rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              تلاش دوباره
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div dir="rtl" className="bg-gray-50 pb-16">

        {/* ============ HERO ============ */}
        <section className="relative w-full h-[440px] sm:h-[520px] lg:h-[600px] overflow-hidden rounded-b-3xl">
          <img
            src={Banner}
            alt="بنر تکنو دیلی — اخبار و تحلیل تکنولوژی"
            loading="eager"
            fetchpriority="high"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-transparent" />

          <div className="relative z-10 h-full flex flex-col justify-end pb-12 sm:pb-16 px-6 sm:px-10 lg:px-14">
            <span className="inline-flex items-center gap-1.5 w-fit mb-4 px-3 py-1.5 text-xs sm:text-sm font-medium text-white bg-gradient-to-l from-blue-500 to-blue-700 rounded-full">
              <span className="w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse" />
              تکنولوژی روز دنیا
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white drop-shadow-lg leading-[1.1] tracking-tight">
              تکنو دیلی
            </h1>

            <p className="mt-4 text-white/85 text-sm sm:text-lg lg:text-xl font-light max-w-2xl leading-relaxed">
              با ما در دنیای فناوری پیشقدم باشید — اخبار، تحلیل و مقالات تخصصی
            </p>

            {/* CTA */}
            <div className="mt-6 flex items-center gap-3">
              <Link
                to="/searchpage"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 text-sm sm:text-base font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                شروع کاوش
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1 text-white/60">
            <span className="text-[10px] tracking-widest uppercase">scroll</span>
            <div className="w-[1px] h-6 bg-white/40 animate-pulse" />
          </div>
        </section>

        {/* ============ SLIDER ============ */}
        <section className="mt-8 w-full rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-gray-100 h-[300px] sm:h-[380px] lg:h-[460px]">
          <SliderComponent posts={sliderPosts} />
        </section>

        {/* ============ AD TOP ============ */}
        <div className="mt-6 w-full rounded-2xl overflow-hidden">
          <FakeAd3 />
        </div>

        {/* ============ MAIN GRID ============ */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">

          {/* ---------- ستون اصلی ---------- */}
          <main className="lg:col-span-3 space-y-14">

            {categories.map((cat, catIdx) => {
              const postsInCategory = posts
                .filter((post) => post.categories.includes(cat.id))
                .slice(0, 4);

              if (postsInCategory.length === 0) return null;

              return (
                <section key={cat.id} className="space-y-5">

                  {/* هدر دسته — ادیتوریال */}
                  <div className="flex items-end justify-between gap-3 pb-3 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl sm:text-4xl font-black text-blue-100 leading-none select-none">
                        {String(catIdx + 1).padStart(2, "0")}
                      </span>
                      <div className="flex flex-col">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                          {cat.name}
                        </h2>
                        <span className="text-xs sm:text-sm text-gray-500 mt-0.5">
                          {postsInCategory.length} خبر تازه
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/category/${cat.slug}`}
                      className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-medium text-blue-600 hover:text-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg px-1 py-1"
                    >
                      <span>مشاهده همه</span>
                      <svg
                        className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </Link>
                  </div>

                  {/* کارت‌ها */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {postsInCategory.map((item) => (
                      <Link
                        key={item.id}
                        to={`/singlenews/${item.id}`}
                        className="group block rounded-2xl overflow-hidden bg-white ring-1 ring-gray-100 shadow-sm hover:shadow-xl hover:ring-blue-200 hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        {/* تصویر با زوم نرم */}
                        <div className="relative aspect-video overflow-hidden bg-gray-100">
                          <img
                            src={item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://via.placeholder.com/600x340"}
                            alt={item.title?.rendered || "تصویر خبر"}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* چیپ زمان مطالعه */}
                          <span className="absolute top-2 left-2 text-[10px] sm:text-xs font-medium bg-black/70 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">
                            {getReadingTime(item.excerpt?.rendered)} دقیقه
                          </span>
                        </div>

                        {/* محتوا */}
                        <div className="p-4 space-y-2">
                          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-500">
                            <span className="font-medium text-blue-600">{cat.name}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span>{formatDate(item.date)}</span>
                          </div>

                          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">
                            {item.title?.rendered || "بدون عنوان"}
                          </h3>

                          <p
                            className="text-sm text-gray-600 leading-relaxed line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: item.excerpt?.rendered || "توضیحی برای این خبر ثبت نشده است.",
                            }}
                          />

                          <div className="pt-1 inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                            ادامه مطلب
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}

            {/* Empty state — همه دسته‌ها خالی */}
            {categories.every((cat) =>
              posts.filter((p) => p.categories.includes(cat.id)).length === 0
            ) && (
              <div className="text-center py-16 bg-white rounded-2xl ring-1 ring-gray-100">
                <p className="text-gray-500 text-sm sm:text-base">
                  هنوز خبری در دسته‌بندی‌ها منتشر نشده است.
                </p>
              </div>
            )}

            {/* تبلیغ پایین */}
            <div className="w-full rounded-2xl overflow-hidden">
              <FakeAd2 />
            </div>
          </main>

          {/* ---------- سایدبار Sticky ---------- */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">

              <div className="rounded-2xl overflow-hidden">
                <FakeAd />
              </div>

              <section className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gradient-to-l from-blue-50 to-white">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-gradient-to-b from-red-500 to-red-700 rounded-full" />
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                      جدیدترین خبرها
                    </h2>
                  </div>
                  <span className="text-[10px] font-bold tracking-wider text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                    LIVE
                  </span>
                </div>
                <div className="p-3">
                  <LatestNews posts={latestPosts} />
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};