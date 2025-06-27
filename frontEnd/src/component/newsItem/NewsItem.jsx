import { ShareIcon } from "@heroicons/react/16/solid";

export const NewsItem = ({ img, title, description, date }) => {
  return (
    <div className="p-1 shadow-xl mb-3 transition-transform ease-out hover:scale-[1.02] hover:shadow-2xl hover:bg-gray-200 rounded relative h-[300px] overflow-hidden">
      <img
        className="rounded h-full w-full object-cover"
        src={img}
        alt={title || "تصویر خبر"}
      />
      <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black to-transparent"></div>
      <div className="pr-2 pl-8 items-center text-sm text-white w-full absolute flex justify-between bottom-22">
        <small className="text-right">
          تاریخ انتشار: {new Date(date).toLocaleDateString('fa-IR')}
        </small>
        <span className="flex items-center gap-1 hover:text-red-400 cursor-pointer">
          <ShareIcon className="w-4 h-4" />
          اشتراک گذاری
        </span>
      </div>

      <h2
        className="text-right p-2 font-bold text-xl text-white absolute right-2   drop-shadow bottom-24"
        dangerouslySetInnerHTML={{ __html: title }}
      ></h2>
      
      <div
        className="text-right p-2 text-gray-100 absolute bottom-0"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </div>
  );
};
