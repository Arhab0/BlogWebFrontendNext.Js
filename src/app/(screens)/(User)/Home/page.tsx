"use client";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import useHelper from "../../../../../Helper/helper";
import { useRouter } from "next/navigation";
import Header from "@/app/utils/components/Header/Header";
import Image from "next/image";
import Logo from "../../../../../public/assets/blogLogo.png";
import SearchInputTag from "@/app/utils/components/SearchInputTag/SearchInputTag";

interface Records {
  Id: number;
  Title: string;
  Description: string;
  Img: string;
}
const page = () => {
  const [searchEntry, setSearchEntry] = useState("");
  const router = useRouter();
  const helper = useHelper();
  const [posts, setPosts] = useState<Records[]>([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  useEffect(() => {
    fetchData();
  }, [error]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const fetchData = async () => {};

  const getText = (html: any) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent != null ? doc.body.textContent : "";
  };

  const handleSearch = async (e: any) => {};

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Header />
      <div className="px-4 py-24 md:px-6 md:py-32">
        <div className="max-w-7xl mx-auto">
          <span>
            {error && (
              <p className="font-bold md:text-4xl text-xl py-20 text-center">
                {error}
              </p>
            )}
          </span>

          {currentPosts.length === 0 ? (
          <h1 className="text-5xl font-semibold text-center">
            No Posts Available
          </h1>
          ) : (
          <>
            <div className="flex justify-between items-center flex-wrap mb-8">

              <div className="w-full md:w-1/3 flex justify-start">
                <SearchInputTag
                  placeHolder="Search..."
                  name="searchBy"
                  value={searchEntry}
                  label=""
                  setter={(n, v) => {
                    setCurrentPage(1);
                    setSearchEntry(v);
                  }}
                />
              </div>

              {/* Categories */}
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                  Category 1
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                  Category 2
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                  Category 3
                </button>
              </div>
            </div>

            {currentPosts.map((post: Records) => (
              <div className="relative mb-10" key={post.Id}>
                <div
                  className={`flex flex-col md:flex-row ${
                    post.Id % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-6 md:gap-x-[80px]`}
                >
                  <div className="flex-2 relative">
                    <div
                      onClick={() => {
                        `/Post/${post.Id}`;
                      }}
                    >
                      <img
                        src={`${helper.GetImageUrl}/${post.Img}`}
                        className="w-full max-w-[430px] mx-auto hover:scale-95 object-cover duration-300 hover:drop-shadow-2xl cursor-pointer h-80 rounded"
                        alt=""
                      />
                    </div>
                  </div>
                  <div
                    className="flex flex-1 pt-2 justify-center md:justify-start text-center md:text-left mt-2"
                    onClick={() => {
                      `/Post/${post.Id}`;
                    }}
                  >
                    <h1 className="md:text-3xl text-xl font-bold md:my-0 my-3 hover:drop-shadow-2xl">
                      {post.Title}
                    </h1>
                    <p className="md:text-lg mt-5">
                      {getText(post.Description).length > 50
                        ? getText(post.Description).substring(0, 220)
                        : getText(post.Description)}
                      .....
                    </p>
                    <button className="my-3 px-4 py-2 hover:drop-shadow-2xl rounded-md bg-[#b9e7e7] hover:-translate-y-1 duration-200">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
          )}

          {currentPosts.length > 0 && (
            <div className="flex flex-col items-center">
              <div className="mt-5">
                Showing {currentPosts.length} posts out of {posts.length}
              </div>
              <div className="flex items-center justify-center mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 mr-4 bg-gray-200 rounded disabled:opacity-50"
                >
                  <FaArrowLeft />
                </button>
                <span className="mr-4 font-bold">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
