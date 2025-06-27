import React, { useContext } from "react";
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
    title, setTitle,
    content, setContent,
    selectedCategory, setSelectedCategory,
    setImageFile,
    imagePreview, setImagePreview,editingPost


  } = useContext(NewsContext);

  return (
    <>
      <h2 className="text-lg font-semibold my-4 text-gray-700">
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

      <div className="mt-8 rounded-2xl bg-blue-950 p-4">
        <h2 className="text-lg font-semibold mb-4 text-right text-gray-500">
          لیست پست‌ها:
        </h2>
        <div className="flex flex-wrap gap-2 my-2">
          <button
            onClick={() => handleFilterByCategory(null)}
            className={`px-3 py-1 rounded shadow text-black ${filteredCategoryId === null ? "bg-blue-600" : "bg-gray-200"
              }`}
          >
            همه پست‌ها
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilterByCategory(cat.id)}
              className={`px-3 py-1 rounded shadow text-black ${filteredCategoryId === cat.id ? "bg-blue-600" : "bg-gray-200"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-1">
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
            <div className="border p-4 rounded shadow text-center bg-white h-[480px] text-gray-800 text-4xl">
              <h1>در این زمینه پستی یافت نشد</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
