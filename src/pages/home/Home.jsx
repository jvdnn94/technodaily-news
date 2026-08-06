import React, { useContext, useEffect } from "react";
import { Container } from "../../component/container/Container";
import { NewsItem } from "../../component/newsItem/NewsItem";
import { Link } from "react-router-dom";
import { API_BASE, GetCategories, GetPostsData } from "../../services/api";
import { SliderComponent } from "../../component/sliderComponent/SliderComponent";
import { LatestNews } from "../../component/latestnews/Latest";
import { FakeAd } from "../../component/fakeAd/FakeAd";
import { FakeAd2 } from "../../component/fakeAd/FakeAd2";
import { NewsContext } from "../../context/NewsContext";
import { FakeAd3 } from "../../component/fakeAd/FakedAd3";
import Banner from "../../assets/images/NewBanner.png";
import { SpecialItem } from "../../component/specialItem/SpecialItem";

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

  if (loading) {
    return (
      <Container>
        <p className="text-center py-12 text-blue-600 font-semibold min-h-[65vh] mt-12 text-base sm:text-lg">
          ...در حال بارگزاری اخبار
        </p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p className="text-center py-10 text-red-600 font-semibold mt-14 min-h-[65vh] text-base sm:text-lg">
          {error}
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-4 bg-gray-200 pb-2 border-gray-300 shadow-2xl mt-12" dir="rtl">
        {/* بنر */}
        <div className="relative col-span-1 lg:col-span-4 w-full overflow-hidden">
          <img
            src={Banner}
            alt="بنر تکنودیلی"
            className="w-full h-screen max-h-[660px] min-h-[400px] object-cover object-top"
          />
          <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-gray-200 to-transparent z-10"></div>
          <div className="absolute inset-0 z-50 flex flex-col justify-end pb-[8%] px-[5%] text-right">
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l to-cyan-300 via-white from-blue-500 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]">
              تکنودیلی
            </h1>
            <h2 className="text-white text-lg sm:text-2xl md:text-4xl mt-2 drop-shadow-[1px_1px_3px_rgba(0,0,0,0.6)] font-light tracking-wide">
              با ما در دنیای فناوری پیشقدم باشید
            </h2>
          </div>
        </div>

        {/* ستون اصلی */}
        <div className="col-span-1 lg:col-span-3">
          <div className="w-full mt-4 sm:mt-6 h-[300px] sm:h-[400px] lg:h-[480px] px-2 lg:px-0">
            <SliderComponent posts={sliderPosts} />
          </div>

          <div className="w-full mt-3 mb-4 px-2 lg:px-0">
            <FakeAd3 />
          </div>

          <div className="bg-white pt-2" dir="rtl">
            {categories.map((cat) => {
              const postsInCategory = posts
                .filter((post) => post.categories.includes(cat.id))
                .slice(0, 4);

              if (postsInCategory.length === 0) return null;

              return (
                <div key={cat.id} className="px-2 sm:px-4 pt-2">
                  <div className="font-bold text-blue-900 border-r-4 border-blue-700 pr-4 bg-blue-100 rounded-l-2xl mb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 ">
                    <h1 className="text-base sm:text-xl md:text-2xl">{cat.name}</h1>
                    <Link
                      to={`/category/${cat.slug}`}
                      className="px-3 py-1.5 text-xs sm:text-sm md:text-base bg-blue-600 text-white rounded-full lg:flex hidden hover:bg-red-900 hover:text-blue-400 transition-all duration-300"
                    >
                      بیشتر بخوانید ...
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 pb-2">
                    {postsInCategory.map((item) => (
                      <Link to={`/singlenews/${item.id}`} key={item.id}>
                        <NewsItem
                          img={item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://via.placeholder.com/300"}
                          title={item.title?.rendered || "بدون عنوان"}
                          description={item.excerpt?.rendered || "توضیحی برای این خبر ثبت نشده است."}
                          date={item.date}
                        />
                      </Link>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <Link
                      to={`/category/${cat.slug}`}
                      className="px-3  text-xs sm:text-sm text-blue-600 rounded-full lg:hidden hover:bg-red-900 hover:text-blue-400 transition-all duration-300"
                    >
                      بیشتر بخوانید ...
                    </Link>
                  </div>

                  <hr className="border-t-4 border-gray-700 rounded-3xl mt-4" />
                </div>
              );
            })}
            <FakeAd2 />
          </div>
        </div>

        {/* ستون کناری */}
        <div className="col-span-1">
          <div className="space-y-4 md:space-y-6 mt-4 md:mt-8 px-2 sm:px-0">
            <div>
              <FakeAd />
            </div>
            <div>
              <h1 className="pr-1 pl-6 pb-1 text-red-500 font-extrabold text-lg sm:text-xl md:text-2xl border-red-500 border-b-4 mr-2">
                جدیدترین خبرها
              </h1>
              <LatestNews posts={latestPosts} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};