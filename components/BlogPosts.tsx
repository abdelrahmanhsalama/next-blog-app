import { posts } from "@/libs/posts";
import PostSlot from "./PostSlot";

const BlogPosts = () => {
  return (
    <main className="space-y-8">
      {posts.map((post) => (
        <PostSlot post={post} key={post.id} />
      ))}
    </main>
  );
};

export default BlogPosts;
