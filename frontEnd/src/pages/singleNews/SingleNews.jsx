import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "../../component/container/Container";
import { GetSinglePost } from "../../services/api";
import { ShareIcon } from "@heroicons/react/16/solid";
import { FakeAd2 } from "../../component/fakeAd/FakeAd2";
import { FakeAd } from "../../component/fakeAd/FakeAd";
import { NewsContext } from "../../context/NewsContext";
import { LatestNews } from "../../component/latestnews/Latest";
import { LikeDislike } from "../../component/likeDislike/LikeDislikeComponent";

export const SingleNews = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { PopularPosts, fetchPopularPosts } = useContext(NewsContext)

  useEffect(() => {
    GetSinglePost(id).then((data) => {
      console.log("Single post data:", data);
      setPost(data);
      fetchPopularPosts();
    });
  }, [id]);

  if (!post) {
    return <p className="text-center text-gray-800 pt-18 min-h-[62vh]">...در حال بارگزاری خبر</p>;
  }

  return (
    <>
      <Container>
        <div className=" rounded-2xl grid grid-cols-4 mt-15 bg-gray-200 border-gray-300 shadow" dir="rtl">

          <div className=" p-2  col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-10 gap-4 pt-0 " dir="rtl">

              <div className="md:col-span-5 md:order-1 order-2">
                <img
                  src={
                    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                    "https://via.placeholder.com/800x400"
                  }
                  alt={post.title?.rendered || "تصویر خبر"}
                  className="rounded-2xl w-full max-h-[400px] object-cover"
                />
              </div>


              <div className="md:col-span-5 md:order-2 order-1 text-right mt-6 mr-2 ">

                <small className="text-sm text-blue-600 font-bold mb-2">
                  {post._embedded["wp:term"][0][0].name}
                </small>

                <h1
                  className="font-bold text-2xl mb-4 text-gray-800"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div className="flex justify-between items-center  text-gray-500 pr-4 pl-12 font-bold text-xl">
                  <small className="text-right">
                    تاریخ انتشار: {new Date(post.date).toLocaleDateString('fa-IR')}
                  </small>
                
                </div>
              </div>
            </div>

            <div
              dir="rtl"
              className="max-w-none text-right leading-loose custom-prose text-gray-800"
              style={{ unicodeBidi: "plaintext" }}
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            >
            </div>

            <div className="flex justify-between">
             <div className="flex">
              <p className="text-gray-800 font-bold text-xl mt-6 text-center">این محتوا را پسندیدید؟</p>
              <LikeDislike />
              </div> 
                <a className="flex items-center gap-1 hover:text-red-600 font-bold text-gray-800">

                    <ShareIcon className="w-4 h-4" />
                    اشتراک گذاری
                  </a>ب
            </div>

            <div className="w-full mt-12"> <FakeAd2 /></div>
          </div>
          <div className="col-span-1 pt-4 pl-2">
            <FakeAd />
            <div className="mx-0">
              <h1 className="pr-5 pl-6 pb-1 text-red-500 font-extrabold  text-3xl border-red-500 border-b-4 mr-2 mt-6">
                پربازدید ترین ها
              </h1>
              <LatestNews posts={PopularPosts} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
