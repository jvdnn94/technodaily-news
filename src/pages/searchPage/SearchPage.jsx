import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { API_BASE, GetPostsData } from "../../services/api";
import { Container } from "../../component/container/Container";
import { NewsItem } from "../../component/newsItem/NewsItem";
import { FakeAd } from "../../component/fakeAd/FakeAd";
import { NewsContext } from "../../context/NewsContext";
import { LatestNews } from "../../component/latestnews/Latest";
import axios from "axios";

export const SearchPage = () => {
  const [params] = useSearchParams();
  const query = params.get("query") || "";
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    GetPostsData().then((data) => {
      const filtered = data.filter((item) =>
        item.title.rendered.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(filtered);
     
    });
  }, [query]);
   useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/posts?_embed`);
        const sorted = res.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setLatestPosts(sorted.slice(0, 12));
      } catch (err) {
        console.error("خطا در دریافت جدیدترین اخبار:", err);
      }
    };

    fetchLatestPosts();
  }, []);

  return (
    <Container>
      <div
        className="grid grid-cols-1 lg:grid-cols-4 bg-amber-50 mt-8 gap-6"
        dir="rtl"
      >
        {/* بخش نتایج جستجو */}
        <div className="lg:col-span-3 px-2 sm:px-4">
          <h1 className="text-right pt-8 sm:pt-14 pb-4 font-bold text-lg sm:text-xl md:text-2xl text-blue-700 border-b mb-4">
            نتایج جستجو برای: "{query}"
          </h1>

          {filteredPosts.length === 0 ? (
            <p className="text-right text-gray-500">هیچ خبری پیدا نشد.</p>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4"
              dir="rtl"
            >
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

        {/* بخش تبلیغات و پربازدیدترین‌ها */}
        <div className="lg:col-span-1 px-2 sm:px-4">
          <div className="mt-8 sm:mt-12">
            <FakeAd />
          </div>
          <div>
            <h1 className="pr-1 pl-6 pb-1 text-red-500 font-extrabold text-xl sm:text-2xl md:text-3xl border-red-500 border-b-4 mr-2">
              جدیدترین خبرها
            </h1>
            <LatestNews posts={latestPosts} />
          </div>
        </div>
      </div>
    </Container>
  );
};
