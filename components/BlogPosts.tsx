import { Post } from "@/libs/types";
import PostSlot from "./PostSlot";

const BlogPosts = async () => {
  try {
    const posts = await fetch("http://localhost:8000/api/posts").then((res) =>
      res.json()
    );

    return (
      <main className="space-y-4">
        {posts.map((post: Post) => (
          <PostSlot post={post} key={post.id} />
        ))}
      </main>
    );
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center flex-1 space-y-4">
        <p className="text-[2rem]">😕</p>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Couldn't Load Posts</h2>
          <p className="text-gray-500">Please try visiting us again later.</p>
        </div>
      </div>
    );
  }
};

export default BlogPosts;
