"use client";

import { useState } from "react";

export default function NewPost() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const formFields = [
    { label: "Title", name: "title", type: "input", mandatory: true },
    { label: "Image URL", name: "imageUrl", type: "input", mandatory: false },
    {
      label: "YouTube Video URL",
      name: "youtubeUrl",
      type: "input",
      mandatory: false,
    },
    { label: "Content", name: "content", type: "textarea", mandatory: true },
  ];

  return (
    <main className="space-y-4 w-full">
      <h2 className="text-xl">New Post</h2>
      <form
        className="space-y-2 *:block"
        action="http://localhost:8000/api/posts"
        method="POST"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const formDataObj = Object.fromEntries(formData.entries());
          if (!formDataObj.title || !formDataObj.content) {
            setError("😕 Missing title or content");
            setSuccess("");
            return;
          }
          try {
            const response = await fetch("http://localhost:8000/api/posts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formDataObj),
            });
            const responseData = await response.json();
            console.log("Response data:", responseData);
            if (response.ok) {
              setSuccess(":) Post submitted successfully");
              setError("");
            }
          } catch (error: unknown) {
            const errorMessage =
              error instanceof Error && error.message == "Failed to fetch"
                ? "😕 Server didn't respond, try again later"
                : `😕 Something went wrong - ${
                    error instanceof Error ? error.message : "Unknown error"
                  }`;
            setError(errorMessage);
            setSuccess("");
          }
        }}
      >
        {formFields.map((formField) => (
          <label className="space-y-1" key={formField.name}>
            <div>
              {formField.label}{" "}
              {formField.mandatory && <span className="text-red-600">*</span>}
            </div>
            {formField.type === "input" ? (
              <input
                className="border border-gray-600 outline-0 rounded w-full p-2"
                name={formField.name}
              ></input>
            ) : (
              <textarea
                className="border border-gray-600 outline-0 rounded w-full p-2"
                rows={10}
                name={formField.name}
              ></textarea>
            )}
          </label>
        ))}
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
          className="px-4 py-2 mx-auto bg-blue-600 text-white rounded hover:bg-blue-600/90 cursor-pointer duration-200"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
