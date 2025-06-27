import { Link } from "react-router-dom";

export const LatestNews = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 mr-2">
      {posts && posts.length > 0 &&
      posts.map((post) => (
        <Link
          to={`/singlenews/${post.id}`}
          key={post.id}
          className="flex gap-3 items-start  hover:bg-gray-400  
          pr-1 bg-gray-100 duration-300"
        >
        <div className="px-[2px] border-b border-gray-400 flex">
            <div className="w-30 h-24 flex-shrink-0 rounded overflow-hidden transition-transform ease-out my-1">
            <img
              src={
                post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                "https://via.placeholder.com/80"
              }
              alt={post.title?.rendered}
              className="w-full h-full object-cover hover:scale-[1.02]"
            />
          </div>
          <div className="w-40 mr-4">
            <h2
              className="text-sm font-semibold text-gray-900 leading-snug mt-1"
              dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
            />
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
};
