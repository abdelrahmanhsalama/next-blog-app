"use client";

import Lexical, { LexicalRef } from "@/components/lexical/Lexical";
import { useRef, useState } from "react";

export default function NewPost() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [postTitle, setPostTitle] = useState<string>("");
  const [postImage, setPostImage] = useState<string>("");
  const lexicalRef = useRef<LexicalRef>(null);

  const isEditorEmpty = (): boolean => {
    if (!lexicalRef.current) return true;
    return !lexicalRef.current.hasContent();
  };

  const getHTMLContent = async () => {
    if (lexicalRef.current) {
      const html = await lexicalRef.current.getHTML();
      return html;
    }
  };

  const getPlainTextContent = async () => {
    if (lexicalRef.current) {
      const plainText = await lexicalRef.current.getPlainText();
      console.log(plainText);
      return plainText;
    }
    return "";
  };

  const formFields = [
    {
      label: "Title",
      name: "title",
      mandatory: true,
      value: postTitle,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPostTitle(e.target.value),
    },
    {
      label: "Image URL",
      name: "imageUrl",
      mandatory: false,
      value: postImage,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPostImage(e.target.value),
    },
  ];

  const handleSubmit = async () => {
    if (!postTitle.trim() || isEditorEmpty()) {
      setError("Post Title or Content empty!");
      return;
    }
    setError("");
    const postData = {
      title: postTitle,
      image: postImage,
      content: await getPlainTextContent(),
      content_html: await getHTMLContent(),
    };
    const postJSON = JSON.stringify(postData);
    try {
      await fetch("http://localhost:8000/api/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: postJSON,
      });
      setSuccess("Post submitted successfully 😄");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setError(errorMessage);
    }
    console.log(postData);
    console.log(postJSON);
  };

  return (
    <main className="space-y-2 w-full">
      <h2 className="text-xl">New Post</h2>

      <div className="space-y-2 *:block">
        {formFields.map((formField) => (
          <label className="space-y-2" key={formField.name}>
            <div>
              {formField.label}{" "}
              {formField.mandatory && <span className="text-red-600">*</span>}
            </div>
            <input
              className="border border-[#999] outline-0 rounded w-full p-1.5"
              name={formField.name}
              value={formField.value}
              onChange={formField.onChange}
            ></input>
          </label>
        ))}
      </div>

      <p>
        Content <span className="text-red-600">*</span>
      </p>
      <Lexical ref={lexicalRef} />

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          error || success ? "h-8" : "h-0"
        }`}
      >
        <div className="pb-1">
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          type="submit"
          className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-600/90 cursor-pointer duration-200"
          onClick={handleSubmit}
        >
          Submit
        </button>

        <div className="flex gap-1">
          <button
            type="button"
            onClick={getHTMLContent}
            className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-600/90 cursor-pointer duration-200"
          >
            HTML
          </button>

          <button
            type="button"
            onClick={() => console.log(isEditorEmpty())}
            className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-600/90 cursor-pointer duration-200"
          >
            Empty?
          </button>
        </div>
      </div>
    </main>
  );
}
