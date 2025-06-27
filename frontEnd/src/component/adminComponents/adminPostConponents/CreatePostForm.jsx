import { useContext } from "react";
import { NewsContext } from "../../../context/NewsContext";

export const CreatePostForm = ({
  handleSubmit,
  title,
  setTitle,
  content,
  setContent,
  setImageFile,
  setImagePreview,
  selectedCategory,
  setSelectedCategory,
  imagePreview,
  editingPost,
}) => {
  const { categories } = useContext(NewsContext);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-950 p-4 rounded-2xl shadow space-y-4"
    >
      <input
        type="text"
        placeholder="عنوان"
        className="w-full p-2 border rounded text-right bg-white text-gray-800"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="محتوا"
        className="w-full p-2 border rounded text-right h-32 bg-white text-gray-800"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className="w-full grid grid-cols-3">
        <div className="col-span-1 grid-row-2">
          <input
            dir="ltr"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImageFile(e.target.files[0]);
              setImagePreview(URL.createObjectURL(e.target.files[0]));
            }}
            className="text-right bg-emerald-500 px-4 py-2 rounded ml-2 row-span-1 h-[40px]"
          />
          <div className="row-span-1">
            <label className="block mb-1 font-semibold text-right text-sm text-gray-400">
              انتخاب دسته‌بندی:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
              className="w-full p-2 rounded border text-right bg-white text-gray-800"
              required
            >
              <option value="">یک دسته‌بندی را انتخاب کنید</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-span-1 text-center">
          {imagePreview && (
            <button
              type="button"
              onClick={() => {
                setImageFile(null);
                setImagePreview(null);
              }}
              className="bg-red-500 text-white w-[80px] py-[10px] rounded shadow  ml-64"
            >
              حذف تصویر
            </button>
          )}
        </div>
        <span className="col-span-1 w-[160px] h-[160px] bg-blue-100 mr-35 rounded-[5px]">
          {imagePreview?
            <img
              src={imagePreview}
              alt="پیش‌نمایش تصویر"
              className="w-40 h-40 object-cover mb-2 rounded-[5px] mx-auto p-1"
            />:<h1 className="text-gray-700 font-bold text-3xl px-3">یک تصویر برای پست خود انتخاب کنید</h1>
          }
        </span>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700 h-[40px]"
      >
        {editingPost? "ویرایش پست": "ارسال پست"}
      </button>
    </form>
  );
};
