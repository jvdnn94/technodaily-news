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
  const { posts, setPosts, setFilteredPosts, FilteredPosts, loading, setLoading, sliderPosts, setSliderPosts, error, setError,
    setCategories, categories, latestPosts, PopularPosts, fetchPopularPosts, fetchspecialPosts, specialPosts } = useContext(NewsContext);



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
    fetchPopularPosts();
    fetchspecialPosts();
  }, []);

  if (loading) {
    return (
      <Container>
        <p className="text-center py-12 text-blue-600 font-semibold min-h-[62vh] mt-12">
          ...در حال بارگزاری اخبار
        </p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p className="text-center py-10 text-red-600 font-semibold mt-14 h-[480px]">
          {error}
        </p>
      </Container>
    );
  };

  return (
    <Container>
      <div className="grid grid-cols-4 bg-gray-200 pb-[2px] mt-16 border-gray-300 border-1 shadow-2xl" dir="rtl">
        <div className="col-span-4 relative">
          <img src={Banner} alt="" className="w-full h-[480px] " />
          <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-gray-200 to-transparent z-10"></div>
          <div className="absolute bottom-12 z-50 mr-20">
            <h1 className="mr-44 mb-10 text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-cyan-300 via-white ftom-blue-500 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]">
              تکنودیلی
            </h1>
            <h2 className="text-white text-3xl md:text-3xl mt-4 mr-96 drop-shadow-[1px_1px_3px_rgba(0,0,0,0.6)] font-light tracking-wide">
              هر روز با تکنولوژی، هر لحظه با دانش
            </h2>
          </div>

        </div>
        <div className="col-span-3">

          <div className="w-full h-[480px] mt-6 grid grid-cols-3">
            <div className="h-[480px] col-span-2">
              <SliderComponent posts={sliderPosts} />
            </div>
            <div className="col-span-1 h-full mr-1 gap-0.5">
             
              {specialPosts.map((item) => (
                <Link to={`/singlenews/${item.id}`} key={item.id}>
                  <SpecialItem
                    img={
                      item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                      "https://via.placeholder.com/300"
                    }
                    title={item.title?.rendered || "بدون عنوان"}
                    

                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full mt-1 mb-1">
            <FakeAd3 />
          </div>
          <div className="mt-[2px] bg-white pt-2" dir="rtl">
            {categories.map((cat) => {
              const postsInCategory = posts.filter((post) => post.categories.includes(cat.id))
                .slice(0, 4);

              if (postsInCategory.length === 0) return null;

              return (
                <div key={cat.id} className=" px-4 pt-2">

                  <div className=" font-bold text-blue-900 border-r-4 border-blue-700 pr-4 bg-blue-100
                  rounded-l-2xl  mb-2 flex justify-between">
                    <h1 className="text-2xl">
                      {cat.name}
                    </h1>
                    <Link
                      to={`/category/${cat.slug}`}
                      className="px-3 py-2 bg-blue-600 text-md text-white rounded-full hover:bg-red-900 transition-all duration-300"
                    >
                      خبرهای بیشتر ...
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-0">
                    {postsInCategory.map((item) => (
                      <Link to={`/singlenews/${item.id}`} key={item.id}>
                        <NewsItem
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

                  <div className="flex justify-center mb-4">

                  </div>
                  <hr className="border-t-4 border-gray-700 rounded-3xl mt-2" />
                </div>
              );
            })}
            <FakeAd2 />
          </div>
        </div>

        <div className="col-span-1 ">
          <div className="mx-0">
            <h1 className=" pr-5 pl-6 pb-1 text-red-500 font-extrabold  text-3xl border-red-500 border-b-4 mr-2 ">
              جدیدترین خبرها
            </h1>
            <LatestNews posts={latestPosts} />
            <div className="my-[8px]">
              <FakeAd />
            </div>

            <div className="h-4">
            </div>
          </div>
          <div className="mx-0">
            <h1 className="pr-5 pl-6 pb-1 text-red-500 font-extrabold  text-3xl border-red-500 border-b-4 mr-2 mt-6">
              پربازدید ترین ها
            </h1>
            <LatestNews posts={PopularPosts} />
          </div>
        </div>

      </div>
    </Container>
  );
};
