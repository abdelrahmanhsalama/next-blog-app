"use client";

import Lexical, { LexicalRef } from "@/components/lexical/Lexical";
import { useCallback, useRef, useState } from "react";

export default function NewPost() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const lexicalRef = useRef<LexicalRef>(null);

  const handleCheckHtml = useCallback(async () => {
    if (lexicalRef.current) {
      const html = await lexicalRef.current.getHTML();
      setHtmlContent(html);
      console.log(html);
    }
  }, []);

  const formFields = [
    { label: "Title", name: "title", type: "input", mandatory: true },
    { label: "Image URL", name: "imageUrl", type: "input", mandatory: false },
    {
      label: "YouTube Video URL",
      name: "youtubeUrl",
      type: "input",
      mandatory: false,
    },
    // { label: "Content", name: "content", type: "textarea", mandatory: true },
  ];

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
            {formField.type === "input" ? (
              <input
                className="border border-[#999] outline-0 rounded w-full p-1.5"
                name={formField.name}
              ></input>
            ) : (
              <textarea
                className="border border-[#999] outline-0 rounded w-full p-1.5"
                rows={10}
                name={formField.name}
              ></textarea>
            )}
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

      <button
        type="submit"
        className="px-3 py-1.5 block mx-auto bg-blue-600 text-white rounded hover:bg-blue-600/90 cursor-pointer duration-200"
      >
        Submit
      </button>
    </main>
  );
}
