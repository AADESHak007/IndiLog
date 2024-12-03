// import React, { useRef, useState, useMemo, useEffect } from "react";
// import axios from "axios";
// import { BACKEND_URL, CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../config";
// import { useNavigate, useParams } from "react-router-dom";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useBlog } from "../hooks";
// import DOMPurify from "dompurify";
// import Loader from "./Loader";

// const UpdateEditor = () => {
//   const navigate = useNavigate();
//   const quillRef = useRef<ReactQuill | null>(null);
//   const [title, setTitle] = useState<string>("");
//   const [content, setContent] = useState<string>("");
//   const { id } = useParams<{ id: string }>();
//   const { loading, blog } = useBlog({ id: id || "" });

//   useEffect(() => {
//     if (blog?.content) {
//       // Sanitize the content and set it in the editor
//       setContent(DOMPurify.sanitize(blog.content));
//     }
//     if (blog?.title) {
//       setTitle(blog.title);
//     }
//   }, [blog]);

//   // Image upload handler
//   const handleImageUpload = async () => {
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.click();

//     input.onchange = async () => {
//       const file = input.files?.[0];
//       if (!file) return;

//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("upload_preset", `${CLOUDINARY_UPLOAD_PRESET}`); // Replace with your Cloudinary upload preset

//       try {
//         const response = await axios.post(
//           `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, // Replace with your Cloudinary URL
//           formData
//         );

//         const imageUrl = response.data.secure_url;

//         // Insert image into the editor
//         const quill = quillRef.current?.getEditor();
//         if (quill) {
//           const range = quill.getSelection();
//           quill.insertEmbed(range?.index || 0, "image", imageUrl);
//         }
//       } catch (error) {
//         console.error("Image upload failed:", error);
//         alert("Failed to upload image. Please try again.");
//       }
//     };
//   };

//   // Memoize ReactQuill configuration
//   const modules = useMemo(
//     () => ({
//       toolbar: {
//         container: [
//           [{ header: "1" }, { header: "2" }, { font: [] }],
//           [{ list: "ordered" }, { list: "bullet" }],
//           ["bold", "italic", "underline", "strike", "blockquote"],
//           [{ align: [] }],
//           [{ color: [] }, { background: [] }],
//           ["link", "image"],
//           ["clean"],
//         ],
//         handlers: {
//           image: handleImageUpload, // Custom image handler
//         },
//       },
//     }),
//     []
//   );

//   const formats = useMemo(
//     () => [
//       "header",
//       "bold",
//       "italic",
//       "underline",
//       "strike",
//       "blockquote",
//       "list",
//       "bullet",
//       "indent",
//       "link",
//       "image",
//       "font",
//       "align",
//     ],
//     []
//   );

//   const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//     try {
//       await axios.put(
//         `${BACKEND_URL}/api/v1/blog`,
//         { id, title, content },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       alert("Your blog has been updated!");
//       navigate(`/blogs`);
//     } catch (error) {
//       console.error("Error in updating the blog:", error);
//       alert("Failed to update the blog. Please try again.");
//     }
//   };

//   if (loading) {
//     return (
//       <div>
//         <div className='text-center h-screen flex justify-center items-center text-blue-500 text-4xl'>
//           <Loader />
//         </div>
//       </div>
//     )
//   }
//   return (
//     <div className="">
//       <div className="editor p-5 mt-5 bg-zinc-100">
//         <form className="w-[80%] mx-auto">
//           <label
//             htmlFor="title"
//             className="block mb-2 text-sm font-medium text-black "
//           >
//             Title:
//           </label>
//           <div className="relative">
//             <input
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               type="text"
//               id="title"
//               aria-describedby="helper-text-explanation"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
//               placeholder="Title..."
//               required
//             />
//           </div>
//           <p
//             id="helper-text-explanation"
//             className="mt-2 text-sm text-gray-500 dark:text-gray-400"
//           >
//             Update your blog...
//           </p>
//           <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
//             <div className="px-4 py-2 bg-white rounded-t-lg">
//               <ReactQuill
//                 ref={quillRef}
//                 theme="snow"
//                 modules={modules}
//                 formats={formats}
//                 value={content}
//                 onChange={setContent}
//               />
//             </div>
//             <div className="flex items-center justify-between px-3 py-2 border-t">
//               <button
//                 onClick={handleSubmit}
//                 className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
//               >
//                 Update Blog
//               </button>
//             </div>
//           </div>
//         </form>
//         <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">
//           Remember, contributions to this topic should follow our{" "}
//           <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">
//             Community Guidelines
//           </a>
//           .
//         </p>
//       </div>
//     </div>
//   );
// };

// export default UpdateEditor;


import React, { useRef, useState, useMemo, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL, CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useBlog } from "../hooks";
import DOMPurify from "dompurify";
import Loader from "./Loader";

const UpdateEditor = () => {
  const navigate = useNavigate();
  const quillRef = useRef<ReactQuill | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  const { loading, blog } = useBlog({ id: id || "" });

  useEffect(() => {
    if (blog?.content) {
      setContent(DOMPurify.sanitize(blog.content));
    }
    if (blog?.title) {
      setTitle(blog.title);
    }
  }, [blog]);

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
      formData.append("upload_preset", `${CLOUDINARY_UPLOAD_PRESET}`);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData
        );

        const imageUrl = response.data.secure_url;
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

  const modules = useMemo(
    () => ({
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
          image: handleImageUpload,
        },
      },
    }),
    []
  );

  const formats = useMemo(
    () => [
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
    ],
    []
  );

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/blog`,
        { id, title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Your blog has been updated!");
      navigate(`/blogs`);
    } catch (error) {
      console.error("Error in updating the blog:", error);
      alert("Failed to update the blog. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <form>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Update Blog</h1>

          {/* Title Input */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Blog Title:
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Content Editor */}
          <div className="mb-6">
            <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
              Blog Content:
            </label>
            <div className="border rounded-lg bg-gray-50">
              <ReactQuill
                ref={quillRef}
                theme="snow"
                modules={modules}
                formats={formats}
                value={content}
                onChange={setContent}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
          >
            Update Blog
          </button>
        </form>
        <p className="text-gray-500 text-sm mt-4">
          Make sure your content follows our{" "}
          <a href="#" className="text-blue-600 underline">
            Community Guidelines
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default UpdateEditor;
