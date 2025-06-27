import { useContext } from "react"
import { NewsContext } from "../../../context/NewsContext"

export const AdminCatComponent=()=>{
    const{editCategoryId,newCategoryName,newCategorySlug,handleUpdateCategory,handleAddCategory,
        setNewCategoryName,setNewCategorySlug,setEditCategoryId,categories,handleDeleteCategory}=useContext(NewsContext)
   return(
    <>
     <h2 className="text-lg font-semibold text-right text-gray-700 mt-2 mb-6">مدیریت دسته‌بندی‌ها</h2>

                  <div className="mt-4 bg-blue-950 p-4 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold text-right text-gray-500 mb-2">
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
                      className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center"
                    >
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="نام دسته‌بندی"
                        className="p-2 border rounded text-right bg-white text-gray-800"
                      />
                      <input
                        type="text"
                        value={newCategorySlug}
                        onChange={(e) => setNewCategorySlug(e.target.value)}
                        placeholder="slug"
                        className="p-2 border rounded text-right bg-white text-gray-800"
                      />
                      <button type="submit" className="bg-green-500 text-white px-3 py-2 rounded">
                        {editCategoryId ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی"}
                      </button>
                    </form>

                    <h3 className="text-lg font-semibold text-right text-gray-500 my-2">دسته‌بندی‌ها:</h3>
                    <ul className="mt-4 space-y-2">
                      {categories.map((cat) => (
                        <li
                          key={cat.id}
                          className="flex justify-between items-center bg-white p-2 rounded shadow text-gray-700"
                        >
                          <span className="flex flex-col text-right px-2 flex-grow">
                            <span className="font-semibold">{cat.name}</span>
                            <span className="text-xs text-gray-500">{cat.slug}</span>
                          </span>

                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditCategoryId(cat.id);
                                setNewCategoryName(cat.name);
                                setNewCategorySlug(cat.slug);
                              }}
                              className="bg-yellow-400 text-white px-2 py-1 rounded"
                            >
                              ویرایش
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(cat.id)}
                              className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                              حذف
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
    </>
   )
}