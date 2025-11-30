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
    return <p>:( Couldn't load posts, please try again later</p>;
  }
};

export default BlogPosts;
