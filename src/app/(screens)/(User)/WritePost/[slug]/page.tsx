"use client";
import React, { useEffect, useRef, useState } from "react";
import RichTextEditor from "@/app/utils/components/TextEditor/rich-text-editor";
import Dropdown from "@/app/utils/components/Dropdown/Dropdown";
import useHelper from "../../../../../../Helper/helper";
import { OPTIONS } from "@/app/lib/type";
import BladeLoader from "@/app/utils/Loaders/BladeLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/app/utils/components/Header/Header";

type PageProps = {
  params: {
    slug: any;
  };
};

const CreatePostPage = ({ params }: PageProps) => {
  const [loading, setLoading] = useState(false);
  const helper = useHelper();
  const [post, setPost] = useState({ Title: "", Description: "", CatId: 0 });
  const [Categories, setCategories] = useState<OPTIONS[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onChange = (content: string) => {
    setPost({ ...post, Description: content });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const GetCategories = () => {
    helper.xhr
      .Get("/Posts/GetCategories")
      .then((res) => {
        setCategories(
          (res.category as any[]).map((D: any, I: number) => {
            return {
              value: D.Id,
              label: D.Category1,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const handleSubmit = () => {
    if (!post.Title.trim()) {
      toast.error("Please enter a post title", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (!selectedCategory || selectedCategory === 0) {
      toast.error("Please select a category", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (!file) {
      toast.error("Please upload a cover image", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (!post.Description.trim()) {
      toast.error("Please enter a post description", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    setLoading(true);

    helper.xhr
      .Post("/Posts/AddPost", helper.ConvertToFormData({ post, file }))
      .then((res) => {
        toast.success("Post published successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setPost({ Title: "", Description: "", CatId: 0 });
        setSelectedImage(null);
        setFile(null);
        setSelectedCategory(0);
        if (fileInputRef.current) fileInputRef.current.value = "";
      })
      .catch((error) => {
        toast.error("Failed to publish post. Try again.", {
          position: "top-right",
          autoClose: 5000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    GetCategories();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-16 px-6 overflow-y-auto">
        <ToastContainer style={{ marginTop: "30px", zIndex: 99999 }} />
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Create New Post
              </h2>
              <input
                type="text"
                placeholder="Post Title"
                value={post.Title}
                onChange={(e) => setPost({ ...post, Title: e.target.value })}
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <RichTextEditor content={post.Description} onChange={onChange} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 flex flex-col">
            <div className="bg-white p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Settings
              </h3>
              <div className="w-full">
                {!selectedImage ? (
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="relative mt-4">
                    <img
                      src={selectedImage}
                      alt="preview"
                      className="rounded-md h-64 w-full object-cover"
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
                      title="Remove Image"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <button
                className={`relative inline-flex items-center w-full mt-2 justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300`}
              >
                <span
                  className={`relative px-8 py-2 rounded-md w-full transition-all ease-in duration-75 ${
                    loading
                      ? "bg-transparent text-white"
                      : "bg-white text-black group-hover:bg-transparent group-hover:text-white"
                  }`}
                  onClick={handleSubmit}
                >
                  {loading ? <BladeLoader /> : "Publish"}
                </span>
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Category
              </h3>
              <div className="relative">
                <Dropdown
                  placeHolder="Categories"
                  name="selectedRegion"
                  options={Categories}
                  activeId={selectedCategory}
                  handleDropdownChange={(n, v: any) => {
                    setSelectedCategory(v);
                    setPost({ ...post, CatId: v });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePostPage;
