
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

export const SliderComponent = ({ posts = [] }) => {
  return (
    <div className=" h-full rounded-l-md ">
      <Swiper
        spaceBetween={30}
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay:5000, disableOnInteraction: false }}
        className="mySwiper h-full rounded-l-md"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <Link to={`/singlenews/${post.id}`}>
              <div className="relative h-full rounded-md overflow-hidden border-2 border-black">
                <img
                  src={
                    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                    "https://via.placeholder.com/300"
                  }
                  alt={post.title.rendered}
                  className="w-full h-full object-cover rounded-l-md"
                />
             
           
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent z-10"></div>

         
                <div className="absolute bottom-6 right-8 z-20 text-right">
                  <small className="inline-block rounded text-sm text-gray-700 font-semibold mb-2  bg-gray-200 px-3 py-1">
                    {post._embedded["wp:term"][0][0].name}
                  </small>
                  <h1 className="text-gray-300 text-3xl font-bold ">
                    {post.title.rendered}
                  </h1>
                </div>
              </div>
            </Link>
          </SwiperSlide>


        ))}
      </Swiper>
    </div>
  );
};
