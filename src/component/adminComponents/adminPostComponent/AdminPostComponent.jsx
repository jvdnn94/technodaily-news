import React, { useContext, useEffect } from "react";
import { NewsContext } from "../../../context/NewsContext";
import { CreatePostForm } from "../adminPostConponents/CreatePostForm";
import { AdminPostItem } from "../adminPostConponents/AdminPostItem";

export const AdminPostComponent = () => {
  const {
    posts,
    handleDelete,
    handleEdit,
    categories,
    filteredCategoryId,
    handleFilterByCategory,
    handleSubmit,
    title,
    setTitle,
    content,
    setContent,
    selectedCategory,
    setSelectedCategory,
    setImageFile,
    imagePreview,
    setImagePreview,
    editingPost,
  } = useContext(NewsContext);

  // ✅ اسکرول خودکار به بالای صفحه هنگام کلیک روی ویرایش
  useEffect(() => {
    if (editingPost) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [editingPost]);

  return (
    <div className="px-2 sm:px-4 md:px-6">
      <h2 className="text-base sm:text-lg md:text-xl font-semibold my-3 md:my-4 text-gray-700 text-right">
        افزودن پست جدید
      </h2>

      <CreatePostForm
        handleSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setImageFile={setImageFile}
        setImagePreview={setImagePreview}
        imagePreview={imagePreview}
        editingPost={editingPost}
      />

      <div className="mt-6 md:mt-8 rounded-2xl bg-blue-950 p-3 sm:p-4 md:p-6">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 md:mb-4 text-right text-gray-300">
          لیست پست‌ها:
        </h2>

        {/* دکمه‌های فیلتر */}
        <div className="flex flex-wrap gap-1 sm:gap-2 my-2">
          <button
            onClick={() => handleFilterByCategory(null)}
            className={`px-2 sm:px-3 py-1 rounded shadow text-xs sm:text-sm text-black transition-colors ${
              filteredCategoryId === null
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            همه پست‌ها
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilterByCategory(cat.id)}
              className={`px-2 sm:px-3 py-1 rounded shadow text-xs sm:text-sm text-black transition-colors ${
                filteredCategoryId === cat.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* شبکه پست‌ها */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 mt-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <AdminPostItem
                key={post.id}
                post={post}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 border p-6 md:p-8 rounded-xl shadow text-center bg-white min-h-[200px] md:min-h-[300px] flex items-center justify-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl text-gray-800">
                در این زمینه پستی یافت نشد
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};