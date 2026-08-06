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
      className="bg-blue-950 p-3 sm:p-4 md:p-6 rounded-2xl shadow space-y-3 md:space-y-4"
    >
      <input
        type="text"
        placeholder="عنوان"
        className="w-full p-2 md:p-3 border rounded-lg text-right bg-white text-gray-800 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      
      <textarea
        placeholder="محتوا"
        className="w-full p-2 md:p-3 border rounded-lg text-right h-28 md:h-32 bg-white text-gray-800 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      {/* بخش انتخاب تصویر و دسته‌بندی */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center md:items-start">
        {/* سمت راست: انتخاب فایل و دسته‌بندی */}
        <div className="flex flex-col w-full md:flex-1 gap-3 md:gap-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center">
            <input
              dir="ltr"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImageFile(e.target.files[0]);
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
              className="w-full sm:w-auto text-right bg-emerald-500 hover:bg-emerald-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer file:mr-2 file:py-1 file:px-3 file:border-0 file:text-sm file:font-semibold file:bg-emerald-700 file:text-white hover:file:bg-emerald-800"
            />
            
            {imagePreview && (
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview(null);
                }}
                className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
              >
                حذف تصویر
              </button>
            )}
          </div>

          <div className="w-full">
            <label className="block mb-1 font-semibold text-right text-xs sm:text-sm text-gray-300">
              انتخاب دسته‌بندی:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
              className="w-full p-2 md:p-2.5 rounded-lg border text-right bg-white text-gray-800 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
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

        {/* سمت چپ: پیش‌نمایش تصویر */}
        <div className="w-full md:w-40 h-40 md:h-40 flex-shrink-0 bg-blue-100 rounded-lg overflow-hidden flex items-center justify-center">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="پیش‌نمایش تصویر"
              className="w-full h-full object-cover"
            />
          ) : (
            <h1 className="text-gray-700 font-bold text-base sm:text-lg md:text-xl px-2 text-center">
              انتخاب تصویر
            </h1>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-sm md:text-base font-medium transition-colors mt-1"
      >
        {editingPost ? "ویرایش پست" : "ارسال پست"}
      </button>
    </form>
  );
};