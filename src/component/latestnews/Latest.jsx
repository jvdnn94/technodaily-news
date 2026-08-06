import { Link } from "react-router-dom";

export const LatestNews = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4 mr-2">
      {posts && posts.length > 0 &&
        posts.map((post) => (
          <Link
            to={`/singlenews/${post.id}`}
            key={post.id}
            className="flex gap-3 items-start hover:bg-gray-200 bg-gray-100 
                       rounded-lg overflow-hidden border border-gray-300 
                       duration-300 transition"
          >
            {/* تصویر خبر */}
            <div className="flex-shrink-0 w-24 h-20 sm:w-28 sm:h-24 md:w-32 md:h-28">
              <img
                src={
                  post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                  "https://via.placeholder.com/150"
                }
                alt={post.title?.rendered}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* متن خبر */}
            <div className="flex-1 pr-2 py-1">
              <h2
                className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 leading-snug"
                dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
              />
            </div>
          </Link>
        ))
      }
    </div>
  );
};
