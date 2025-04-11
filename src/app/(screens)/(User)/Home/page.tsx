"use client";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import useHelper from "../../../../../Helper/helper";
import { useRouter } from "next/navigation";
import Header from "@/app/utils/components/Header/Header";
import SearchInputTag from "@/app/utils/components/SearchInputTag/SearchInputTag";

interface Records {
  postId: number;
  Title: string;
  Description: string;
  Img: string;
  categoryId: number;
}

interface Category {
  Id: number;
  Category1: string;
}

const page = () => {
  const [searchEntry, setSearchEntry] = useState("");
  const router = useRouter();
  const helper = useHelper();
  const [posts, setPosts] = useState<Records[]>([]);
  const [originalPosts, setOriginalPosts] = useState<Records[]>([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState([{ value: 0, label: "All Posts" }]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [loading, setLoading] = useState(true);

  const postsPerPage = 12;

  useEffect(() => {
    fetchData();
    fetchCategory();
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
      .Get("/Posts/GetPosts")
      .then((res) => {
        setPosts(res);
        setOriginalPosts(res);
      })
      .catch((err) => {
        setError("Failed to fetch posts");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchCategory = async () => {
    helper.xhr
      .Get("/Posts/GetCategories")
      .then((res) => {
        setCategory([
          { value: 0, label: "All Posts" },
          ...(res.category as any[]).map((D: any) => {
            return {
              value: D.Id,
              label: D.Category1,
            };
          }),
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    SearchByKeyword();
  }, [searchEntry, selectedCategory]);

  function SearchByKeyword() {
    let filtered = [...originalPosts];

    if (searchEntry.trim() !== "") {
      filtered = filtered.filter((element) =>
        Object.values(element).some((value) =>
          String(value).toLowerCase().includes(searchEntry.toLowerCase())
        )
      );
    }

    if (selectedCategory !== 0) {
      filtered = filtered.filter(
        (element) => element.categoryId === selectedCategory
      );
    }

    setPosts(filtered);
    setCurrentPage(1);
  }

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

  const CatPerTime = 3;
  const [catPage, setCatPage] = useState(1);
  const CategoryindexOfLastPost = catPage * CatPerTime;
  const CategoryindexOfFirstPost = CategoryindexOfLastPost - CatPerTime;
  const currentCategory = category.slice(
    CategoryindexOfFirstPost,
    CategoryindexOfLastPost
  );
  const totalCategory = Math.ceil(category.length / CatPerTime);

  const handleCategoryChange = (page: number) => {
    setCatPage(page);
  };

  return (
    <>
      <Header />
      <div className="px-4 py-10 md:px-6 md:py-10">
        <div className="max-w-7xl mx-auto">
          <span>
            {error && (
              <p className="font-bold md:text-4xl text-xl py-20 text-center">
                {error}
              </p>
            )}
          </span>
          <div className="flex justify-between items-center flex-wrap mb-8">
            <div className="w-full md:w-1/3 flex justify-start">
              <SearchInputTag
                placeHolder="Search..."
                name="searchBy"
                value={searchEntry}
                label=""
                setter={(n, v) => {
                  setSearchEntry(v);
                }}
              />
            </div>

            <div className="flex items-center space-x-2 mt-4 md:mt-0 w-full md:w-auto justify-center md:justify-start">
              <button
                onClick={() => handleCategoryChange(catPage - 1)}
                disabled={catPage === 1}
                className="px-2 py-2 bg-gray-200 text-gray-700 rounded-full disabled:opacity-50"
              >
                <FaArrowLeft />
              </button>

              <div className="flex justify-between space-x-2 w-full md:w-[360px]">
                {currentCategory.map((cat, index) => (
                  <button
                    key={index}
                    className={`${
                      cat.value === selectedCategory
                        ? "from-purple-600 to-blue-500 text-white"
                        : ""
                    } relative inline-flex items-center w-full mt-2 justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300`}
                  >
                    <span
                      className={`relative px-4 py-2 rounded-md w-full transition-all ease-in duration-75 hover:bg-transparent hover:text-white bg-white text-black group-hover:bg-transparent group-hover:text-white`}
                      onClick={() => {
                        setSelectedCategory(cat.value);
                      }}
                    >
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleCategoryChange(catPage + 1)}
                disabled={catPage === totalCategory}
                className="px-2 py-2 bg-gray-200 text-gray-700 rounded-full disabled:opacity-50"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>

          {loading ? (
            <h1 className="text-5xl font-semibold text-center">
              Fetching data...
            </h1>
          ) : currentPosts.length === 0 ? (
            <h1 className="text-5xl font-semibold text-center">
              No Posts Available
            </h1>
          ) : (
            <>
              {currentPosts.map((post: Records, index) => (
                <div className="mb-12" key={post.postId}>
                  <div
                    className={`flex flex-col ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } gap-8 items-center`}
                  >
                    <div className="flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-95">
                      <img
                        src={`https://localhost:44385/${post.Img}`}
                        alt={post.Title}
                        className="w-full max-w-[420px] h-80 object-cover rounded shadow-md"
                      />
                    </div>

                    <div
                      className="flex-1 text-center md:text-left cursor-pointer"
                      onClick={() =>
                        router.push(`/Post/SinglePost/${post.postId}`)
                      }
                    >
                      <h2 className="text-2xl md:text-3xl font-bold mb-4 hover:text-blue-600 transition-colors duration-200">
                        {post.Title}
                      </h2>
                      <p className="text-base md:text-lg text-gray-700 mb-4">
                        {getText(post.Description).length > 220
                          ? `${getText(post.Description).substring(0, 220)}...`
                          : getText(post.Description)}
                      </p>
                      <button className="px-6 py-2 rounded-md bg-[#b9e7e7] hover:bg-[#a3dddd] transition duration-200 shadow-md hover:-translate-y-1">
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
