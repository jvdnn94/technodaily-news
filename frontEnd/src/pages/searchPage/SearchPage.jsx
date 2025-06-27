import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GetPostsData } from "../../services/api";
import { Container } from "../../component/container/Container";
import { NewsItem } from "../../component/newsItem/NewsItem";
import { Link } from "react-router-dom";
import { FakeAd } from "../../component/fakeAd/FakeAd";
import { NewsContext } from "../../context/NewsContext";
import { LatestNews } from "../../component/latestnews/Latest";

export const SearchPage = () => {
  const [params] = useSearchParams();
  const query = params.get("query") || "";
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { TenPopularPosts, fetchPopularPosts } = useContext(NewsContext)
  useEffect(() => {
    GetPostsData().then((data) => {
      const filtered = data.filter((item) =>
        item.title.rendered.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(filtered);
      fetchPopularPosts();
    });
  }, [query]);

  return (
    <Container>
      <div className="grid grid-cols-4 bg-amber-50 mt-8" dir="rtl">

        <div className="col-span-3 px-1">
          <h1 className="text-right pt-14 pb-4 font-bold text-xl text-blue-700 border-b mb-2">
            نتایج جستجو برای: "{query}"
          </h1>
          {filteredPosts.length === 0 ? (
            <p className="text-right text-gray-500">هیچ خبری پیدا نشد.</p>
          ) : (
            <div dir="rtl"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 ">
              {filteredPosts.map((item) => (
                <Link to={`/singlenews/${item.id}`} key={item.id}>
                  <NewsItem
                    img={
                      item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                      "https://via.placeholder.com/300"
                    }
                    title={item.title?.rendered}
                    description={item.excerpt?.rendered}
                    date={item.date}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="col-span-1 mt-13 mb-2">
          <FakeAd />
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
