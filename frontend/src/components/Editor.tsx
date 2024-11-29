import React, { useRef, useState, useMemo } from "react";
import axios from "axios";
import { BACKEND_URL, CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../config";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = () => {
  const navigate = useNavigate();
  const quillRef = useRef<ReactQuill | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // Image upload handler
  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", `${CLOUDINARY_UPLOAD_PRESET}`); // Replace with your Cloudinary upload preset

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, // Replace with your Cloudinary URL
          formData
        );

        const imageUrl = response.data.secure_url;

        // Insert image into the editor
        const quill = quillRef.current?.getEditor();
        if (quill) {
          const range = quill.getSelection();
          quill.insertEmbed(range?.index || 0, "image", imageUrl);
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Failed to upload image. Please try again.");
      }
    };
  };

  // Memoize ReactQuill configuration
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: handleImageUpload, // Custom image handler
      },
    },
  }), []);

  const formats = useMemo(() => [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "font",
    "align",
  ], []);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
       await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Your blog has been created!");
      navigate(`/blogs`);
    } catch (error) {
      console.error("Error in creating the blog:", error);
      alert("Failed to create the blog. Please try again.");
    }
  };

  return (
    <div>
      <div className="editor p-5 bg-zinc-100 mt-5">
        <form className="w-[80%] mx-auto">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Title:
          </label>
          <div className="relative">
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="title"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              placeholder="Title..."
              required
            />
          </div>
          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
          >
            Select a catchy title for your blog...
          </p>
          <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="px-4 py-2 bg-white rounded-t-lg">
              <ReactQuill
                ref={quillRef}
                theme="snow"
                modules={modules}
                formats={formats}
                value={content}
                onChange={setContent}
              />
            </div>
            <div className="flex items-center justify-between px-3 py-2 border-t">
              <button
                onClick={handleSubmit}
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
              >
                Publish Blog
              </button>
            </div>
          </div>
        </form>
        <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">
          Remember, contributions to this topic should follow our{" "}
          <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">
            Community Guidelines
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Editor;
