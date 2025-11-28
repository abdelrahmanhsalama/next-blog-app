import { Post as PostType } from "@/libs/types";
import Image from "next/image";
import Link from "next/link";

const Post = ({ post }: { post: PostType }) => {
  return (
    <article className="flex gap-8 border border-foreground/10 rounded-lg shadow-lg p-4">
      <div className="flex-3/4 space-y-2">
        <div className="space-y-1">
          <Link href={`/post/${post.id}`}>
            <h2 className="text-xl font-medium cursor-pointer inline">
              {post.title}
            </h2>
          </Link>
          <p className="text-sm">
            Written by: {post.author} • Published: {post.date}
          </p>
        </div>
        <p className="line-clamp-6">{post.content}</p>
      </div>
      <Link
        href=""
        className="relative flex-1/4 aspect-square group overflow-hidden"
      >
        <Image
          src={post.image}
          alt={post.image}
          fill
          className="object-cover group-hover:scale-105 duration-100"
        />
      </Link>
    </article>
  );
};

export default Post;
