import { posts } from "@/libs/posts";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = posts.find((post) => post.id === Number(id));

  return post ? (
    <article className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl">{post.title}</h2>
        <p className="text-sm">
          Written by: {post.author} • Published: {post.date}
        </p>
      </div>
      <Image
        src={post.image}
        alt={post.title}
        className="w-full aspect-2/1 object-cover"
        width={2880}
        height={1800}
      />
      <p className="whitespace-pre-line">{post.content}</p>
      {post.youtubeId && (
        <div className="aspect-video w-full">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${post.youtubeId}`}
            title={post.title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )}
    </article>
  ) : null;
}
