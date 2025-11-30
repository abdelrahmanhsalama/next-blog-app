import { posts } from "@/libs/posts";
import Image from "next/image";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const response = await fetch(`http://localhost:8000/api/posts/${id}`);
    if (!response.ok) {
      throw new Error("Post not found");
    }
    const post = await response.json();

    return (
      <article className="space-y-4 border">
        <div className="space-y-2">
          <h2 className="text-2xl">{post.title}</h2>
          <p className="text-sm">
            Written by: {post.author || "Unknown"} • Published: {post.date}
          </p>
        </div>
        <Image
          src={
            post.image ||
            "https://www.rockstargames.com/img/global/downloads/wallpapers/rockstar/BLACKRSTARLOGO_3840x2160.jpg"
          }
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
    );
  } catch (error) {
    return <p>:( Post not found</p>;
  }
}
