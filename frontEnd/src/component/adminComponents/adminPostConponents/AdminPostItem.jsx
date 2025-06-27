export const AdminPostItem = ({post,handleEdit,handleDelete}) => {
  const { id, title, _embedded, date,} = post;
  const img = _embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <div className="space-y-4 col-span-1">
      <div key={id} className="border my-1 p-2 rounded shadow text-right hover:bg-blue-100 bg-white h-[190px]">
        <div className="w-full grid grid-cols-3">
          <h3
            className="font-bold mb-1 col-span-2 text-gray-600"
            dangerouslySetInnerHTML={{ __html: title.rendered }}
          />
          <img
            src={img || "https://via.placeholder.com/800x400"}
            alt="تصویر خبر"
            className="rounded w-32 h-20 mr-2 object-cover col-span-1"
          />
        </div>
        <small className="text-sm text-gray-600 font-semibold mb-2">
          دسته بندی:{post._embedded["wp:term"][0][0].name}
        </small> <br />
        <small className="text-sm text-gray-600 font-semibold mb-4">
          نوشته شده توسط:{post._embedded?.author?.[0]?.name}
        </small>
        <p className="text-sm text-gray-600">
          تاریخ انتشار: {new Date(date).toLocaleDateString("fa-IR")}
        </p>
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => handleEdit(post)}
            className="bg-yellow-400 text-white px-3 py-1 rounded"
          >
            ویرایش
          </button>
          <button
            onClick={() => handleDelete(id)}
            className="bg-red-400 text-white px-3 py-1 rounded"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};



