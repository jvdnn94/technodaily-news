export const AdminPostItem = ({post,handleEdit,handleDelete}) => {
  const { id, title, _embedded, date,} = post;
  const img = _embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <div className="space-y-4 col-span-1">
      <div className="border my-1 p-3 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 text-right bg-white hover:bg-blue-50 min-h-[190px] md:min-h-[160px] flex flex-col">
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2">
          <h3
            className="font-bold mb-1 col-span-2 text-gray-700 text-sm sm:text-base md:text-lg line-clamp-2"
            dangerouslySetInnerHTML={{ __html: title.rendered }}
          />
          <img
            src={img || "https://via.placeholder.com/800x400"}
            alt="تصویر خبر"
            className="rounded w-full h-32 sm:h-20 object-cover col-span-1"
          />
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-gray-600 mt-1">
          <span className="font-semibold">دسته بندی: <span className="font-normal">{post._embedded["wp:term"][0][0].name}</span></span>
          <span className="hidden xs:inline">•</span>
          <span className="font-semibold">نوشته شده توسط: <span className="font-normal">{post._embedded?.author?.[0]?.name}</span></span>
          <span className="hidden xs:inline">•</span>
          <span className="font-semibold">تاریخ انتشار: <span className="font-normal">{new Date(date).toLocaleDateString("fa-IR")}</span></span>
        </div>
        <div className="flex gap-2 mt-2 pt-2 border-t border-gray-100">
          <button
            onClick={() => handleEdit(post)}
            className="flex-1 sm:flex-none bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors"
          >
            ویرایش
          </button>
          <button
            onClick={() => handleDelete(id)}
            className="flex-1 sm:flex-none bg-red-400 hover:bg-red-500 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};