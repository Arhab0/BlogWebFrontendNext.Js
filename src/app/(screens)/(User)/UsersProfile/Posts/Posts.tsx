"use client";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useHelper from "../../../../../../Helper/helper";

interface Records {
  Id: number;
  Title: string;
  Description: string;
  Img: string;
  categoryId: number;
}
type PageProps = {
  ViewMode: string;
  userId: number;
};

const page = ({ ViewMode, userId }: PageProps) => {
  const router = useRouter();
  const helper = useHelper();
  const [posts, setPosts] = useState<Records[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasPost, setHasPost] = useState({
    check: false,
    message: "",
  });

  const postsPerPage = 12;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const fetchData = async () => {
    setLoading(true);
    helper.xhr
      .Get(
        "/Profile/GetAllPostOfUser",
        helper.GetURLParamString({ id: userId }).toString()
      )
      .then((res) => {
        console.log(res);
        if (Array.isArray(res)) {
          setPosts(res);
        } else {
          setHasPost({ check: false, message: res.message });
        }
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const getText = (html: any) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent != null ? doc.body.textContent : "";
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          {currentPosts.length === 0 ? (
            <div className="text-center text-gray-600 mt-10">
              {hasPost.message}
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              {ViewMode === "list" ? (
                <div>
                  {currentPosts.map((post: Records, index) => (
                    <div
                      className="mb-12"
                      key={post.Id}
                      onClick={() => {
                        router.push(`/Post/SinglePost/${post.Id}`);
                      }}
                    >
                      <div className={`flex gap-8 items-center`}>
                        <div className="flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-95">
                          <img
                            src={`https://localhost:44385/${post.Img}`}
                            alt={post.Title}
                            className="w-24 h-24 lg:w-80 lg:h-60 md:w-40 md:h-40 object-cover rounded shadow-md"
                          />
                        </div>

                        <div className="flex-1 lg:text-start cursor-pointer">
                          <h2 className="text-sm lg:text-3xl font-bold mb-4 hover:text-blue-600 transition-colors duration-200">
                            {post.Title}
                          </h2>
                          <p className="text-xs lg:text-lg text-gray-700 mb-4">
                            {getText(post.Description).length > 220
                              ? `${getText(post.Description).substring(
                                  0,
                                  80
                                )}...`
                              : getText(post.Description)}
                          </p>
                          <button className="lg:px-6 lg:py-2 py-1 px-2 rounded-md text-sm bg-[#b9e7e7] hover:bg-[#a3dddd] transition duration-200 shadow-md hover:-translate-y-1">
                            Read More
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentPosts.map((post: Records) => (
                    <div
                      key={post.Id}
                      className="cursor-pointer transition-transform duration-300 hover:scale-95"
                      onClick={() => router.push(`/Post/SinglePost/${post.Id}`)}
                    >
                      <img
                        src={`https://localhost:44385/${post.Img}`}
                        alt={post.Title}
                        className="w-full h-56 object-cover rounded-md shadow-md"
                      />
                      <h3 className="mt-3 text-xl font-semibold text-center hover:text-blue-600 transition">
                        {post.Title}
                      </h3>
                    </div>
                  ))}
                </div>
              )}

              {currentPosts.length > 0 && (
                <div className="flex justify-between items-center">
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
          )}
        </>
      )}
    </>
  );
};

export default page;
