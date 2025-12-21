import Image from "next/image";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getPost(postId: string) {
  const response = await fetch(`http://localhost:8000/api/posts/${postId}`);
  if (!response.ok) {
    throw new Error("Post not found");
  }
  const post = await response.json();
  return post;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;

  try {
    const post = await getPost(id);
    return {
      title: post.title,
    };
  } catch (error) {
    return {
      title: "Post Not Found",
    };
  }
}

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const post = await getPost(id);

    return (
      <article className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl">{post.title}</h2>
          <p className="text-sm">
            Written by: {post.author || "Unknown"} • Published:{" "}
            {post.date.split("T")[0]}
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
    return (
      <div className="flex flex-col items-center justify-center text-center flex-1 space-y-4">
        <p className="text-[2rem]">😕</p>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Post Not Found</h2>
          <p className="text-gray-500">
            The post you're looking for doesn't exist or has been removed.
          </p>
        </div>
        <Link
          href="/"
          className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-600/90 transition-colors cursor-pointer duration-200"
        >
          Back to Home
        </Link>
      </div>
    );
  }
}
