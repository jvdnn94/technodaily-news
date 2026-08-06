import { useContext } from "react";
import { NewsContext } from "../../../context/NewsContext";

export const AdminCatComponent = () => {
  const {
    editCategoryId,
    newCategoryName,
    newCategorySlug,
    handleUpdateCategory,
    handleAddCategory,
    setNewCategoryName,
    setNewCategorySlug,
    setEditCategoryId,
    categories,
    handleDeleteCategory,
  } = useContext(NewsContext);

  return (
    <div className="px-2 sm:px-4">
      <h2 className="text-base sm:text-lg md:text-xl font-semibold text-right text-gray-700 mt-2 mb-4 md:mb-6">
        مدیریت دسته‌بندی‌ها
      </h2>

      <div className="mt-3 md:mt-4 bg-blue-950 p-3 sm:p-4 md:p-6 rounded-2xl shadow">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-right text-gray-300 mb-2 md:mb-3">
          {editCategoryId ? "ویرایش دسته‌بندی:" : "دسته‌بندی جدید:"}
        </h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!newCategoryName || !newCategorySlug) return;
            if (editCategoryId) {
              handleUpdateCategory(editCategoryId, newCategoryName, newCategorySlug);
            } else {
              handleAddCategory(newCategoryName, newCategorySlug);
            }
            setNewCategoryName("");
            setNewCategorySlug("");
            setEditCategoryId(null);
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 items-center"
        >
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="نام دسته‌بندی"
            className="w-full p-2 md:p-2.5 border rounded-lg text-right bg-white text-gray-800 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={newCategorySlug}
            onChange={(e) => setNewCategorySlug(e.target.value)}
            placeholder="slug"
            className="w-full p-2 md:p-2.5 border rounded-lg text-right bg-white text-gray-800 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full sm:w-auto md:w-auto bg-green-500 hover:bg-green-600 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-sm md:text-base font-medium transition-colors"
          >
            {editCategoryId ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی"}
          </button>
        </form>

        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-right text-gray-300 my-3 md:my-4">
          دسته‌بندی‌ها:
        </h3>

        <ul className="mt-3 md:mt-4 space-y-2 md:space-y-3">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-3 md:p-4 rounded-xl shadow hover:bg-gray-50 transition-colors gap-2 sm:gap-3"
            >
              <div className="flex flex-col text-right px-1 flex-1 w-full sm:w-auto">
                <span className="font-semibold text-gray-800 text-sm md:text-base">
                  {cat.name}
                </span>
                <span className="text-xs text-gray-500">{cat.slug}</span>
              </div>

              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setEditCategoryId(cat.id);
                    setNewCategoryName(cat.name);
                    setNewCategorySlug(cat.slug);
                  }}
                  className="flex-1 sm:flex-none bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                >
                  حذف
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};