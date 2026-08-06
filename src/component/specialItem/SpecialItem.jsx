import { ShareIcon } from "@heroicons/react/16/solid";

export const SpecialItem = ({ img, title }) => {
  return (
    <div className="p-1 shadow-xl mb-3 transition-transform ease-out hover:scale-[1.02] hover:shadow-2xl hover:bg-gray-200 rounded relative h-[234px] overflow-hidden">
      <img
        className="rounded h-full w-full object-cover"
        src={img}
        alt={title || "تصویر خبر"}
      />
      <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black to-transparent"></div>
     
     
      <h2
        className="text-right p-2 font-bold text-md text-white absolute right-2   drop-shadow bottom-4"
        dangerouslySetInnerHTML={{ __html: title }}
      ></h2>
      
      
     
    </div>
  );
};
