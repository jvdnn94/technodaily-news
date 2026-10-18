import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

/* تخمین زمان مطالعه */
const getReadingTime = (excerpt = "") => {
  const words = excerpt
    .replace(/<[^>]+>/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

/* تاریخ فارسی کوتاه */
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

export const SliderComponent = ({ posts = [] }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!posts.length) {
    return (
      <div className="h-full flex items-center justify-center rounded-2xl bg-gray-100 text-gray-500 text-sm">
        خبری برای نمایش در اسلایدر نیست
      </div>
    );
  }

  return (
    <div dir="rtl" className="relative h-full rounded-2xl overflow-hidden group/slider">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        speed={700}
        loop={posts.length > 2}
        autoplay={
          posts.length > 1
            ? { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }
            : false
        }
        pagination={{
          type: "fraction",
          formatFractionCurrent: (n) => String(n).padStart(2, "0"),
          formatFractionTotal: (n) => String(n).padStart(2, "0"),
        }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        className="h-full slider-hero"
      >
        {posts.map((post, idx) => {
          const cat = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "خبر";
          const img =
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "https://via.placeholder.com/1200x600";
          const date = formatDate(post.date);
          const readTime = getReadingTime(post.excerpt?.rendered);
          const title = post.title?.rendered || "بدون عنوان";

          return (
            <SwiperSlide key={post.id}>
              <Link
                to={`/singlenews/${post.id}`}
                className="block relative h-full w-full focus-visible:outline-none"
              >
                {/* تصویر با زوم نرم */}
                <img
                  src={img}
                  alt={title}
                  loading={idx === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/slider:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />

                {/* محتوا */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="px-2.5 py-1 text-[11px] sm:text-xs font-semibold text-white bg-gradient-to-l from-blue-500 to-blue-700 rounded-full">
                      {cat}
                    </span>
                    {date && (
                      <span className="text-[11px] sm:text-xs text-white/70">
                        {date}
                      </span>
                    )}
                    <span className="w-1 h-1 bg-white/40 rounded-full" />
                    <span className="text-[11px] sm:text-xs text-white/70">
                      {readTime} دقیقه مطالعه
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold text-white leading-tight line-clamp-2 drop-shadow-lg max-w-3xl">
                    {title}
                  </h2>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* دکمه‌های ناوبری */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover/slider:opacity-100 transition-opacity duration-300">
        <button
          ref={prevRef}
          aria-label="اسلاید قبلی"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button
          ref={nextRef}
          aria-label="اسلاید بعدی"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
};