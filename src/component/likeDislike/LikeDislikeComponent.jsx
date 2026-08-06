import React, { useState } from "react";

export const LikeDislike = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState(null); // 'like' or 'dislike'

  const handleLike = () => {
    if (userReaction === "like") {
      setLikes(likes - 1);
      setUserReaction(null);
    } else {
      if (userReaction === "dislike") setDislikes(dislikes - 1);
      setLikes(likes + 1);
      setUserReaction("like");
    }
  };

  const handleDislike = () => {
    if (userReaction === "dislike") {
      setDislikes(dislikes - 1);
      setUserReaction(null);
    } else {
      if (userReaction === "like") setLikes(likes - 1);
      setDislikes(dislikes + 1);
      setUserReaction("dislike");
    }
  };

  return (
    <div className="mt-6 flex items-center justify-center gap-6">
      <button
        onClick={handleLike}
        className={`flex items-center gap-1 px-4 py-2 rounded-full transition
        ${userReaction === "like" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-green-100"}`}
      >
        👍 {likes}
      </button>

      <button
        onClick={handleDislike}
        className={`flex items-center gap-1 px-4 py-2 rounded-full transition
        ${userReaction === "dislike" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-red-100"}`}
      >
        👎 {dislikes}
      </button>
    </div>
  );
};
