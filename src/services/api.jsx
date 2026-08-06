import axios from "axios";
export const API_BASE = "https://api.my-projectz.ir/wp-json/wp/v2";


export const Client = axios.create({
  baseURL: "https://api.my-projectz.ir/wp-json/wp/v2"
});


export async function GetPostsData() {
  const allPosts = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { data } = await Client(`/posts?_embed&per_page=100&page=${page}`);
    allPosts.push(...data);
    if (data.length < 100) {
      hasMore = false;
    } else {
      page++;
    }
  }

  return allPosts;
}


export async function GetSinglePost(id) {
  const { data } = await Client(`/posts/${id}?_embed`);
  return data;
}
 
  export const TokenURL=   "https://api.my-projectz.ir/wp-json/jwt-auth/v1/token";

  export async function GetCategories() {
  const { data } = await Client("/categories?per_page=100");
  return data;
}