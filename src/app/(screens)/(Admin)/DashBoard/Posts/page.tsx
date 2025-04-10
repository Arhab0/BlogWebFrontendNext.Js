"use client";

import Dropdown from "@/app/utils/components/Dropdown/Dropdown";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useHelper from "../../../../../../Helper/helper";
import moment from "moment";
import { OPTIONS } from "@/app/lib/type";
import SearchInputTag from "@/app/utils/components/SearchInputTag/SearchInputTag";

interface Records {
  AuthorName: string;
  postId: number;
  postTitle: string;
  CreatedAt: string;
  postImg: string;
  isApproved: string;
  ActiveStatus: boolean;
  CategoryName: string;
}

const page = () => {
  const helper = useHelper();
  const router = useRouter();
  const [Categories, setCategories] = useState<OPTIONS[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [options, setOptions] = useState([
    { label: "Active", value: "Active" },
    { label: "De-Activate", value: "Not Active" },
    { label: "Pending", value: "Pending" },
    { label: "Rejected", value: "Rejected" },
  ]);
  const [selectedPostStatus, setSelectedPostStatus] = useState<string>("");

  const [searchEntry, setSearchEntry] = useState<string>("");
  const [result, setResult] = useState<Records[]>([]);
  const [mappedData, setMappedData] = useState<Records[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = mappedData.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(mappedData.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    FetchData();
    GetCategories();
  }, []);

  useEffect(() => {
    if (result.length > 0) {
      SearchByKeyword();
    }
  }, [result, searchEntry, selectedPostStatus, selectedCategory]);

  function getCategoryNameById(id: number) {
    if (!id || id === 0) return "";
    const cat = Categories.find((cat) => cat.value === id);
    return cat ? cat.label : "";
  }

  function SearchByKeyword() {
    let filtered = [...result];

    if (searchEntry.trim() !== "") {
      filtered = filtered.filter((element) =>
        Object.values(element).some((value) =>
          String(value).toLowerCase().includes(searchEntry.toLowerCase())
        )
      );
    }

    if (selectedPostStatus === "Active") {
      filtered = filtered.filter(
        (element) =>
          element.isApproved.toLowerCase() === "approved" &&
          element.ActiveStatus === true
      );
    } else if (selectedPostStatus === "Not Active") {
      filtered = filtered.filter((element) => element.ActiveStatus === false);
    } else if (selectedPostStatus !== "") {
      filtered = filtered.filter(
        (element) =>
          element.isApproved.toLowerCase() === selectedPostStatus.toLowerCase()
      );
    }

    if (selectedCategory && selectedCategory !== 0) {
      const categoryName = getCategoryNameById(selectedCategory);
      filtered = filtered.filter(
        (element) => String(element.CategoryName) === categoryName
      );
    }

    setMappedData(filtered);
  }

  function FetchData() {
    helper.xhr
      .Get("/Admin/GetPosts")
      .then((res) => {
        setResult(res);
        setMappedData(res);
      })
      .catch((err) => {})
      .finally(() => {});
  }

  const GetCategories = () => {
    helper.xhr
      .Get("/Posts/GetCategories")
      .then((res) => {
        setCategories(
          (res.category as any[]).map((D: any) => {
            return {
              value: D.Id,
              label: D.Category1,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="font-alata flex-1 h-full cursor-default">
      <div className="flex gap-4 items-center flex-wrap">
        <div className="w-full md:w-1/4 bg-transparent">
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
        <div className="w-full md:w-1/4">
          <Dropdown
            placeHolder="Filter by post status"
            name="selectedPostStatus"
            options={options}
            clearable={true}
            activeId={selectedPostStatus}
            handleDropdownChange={(n, v: any) => {
              setCurrentPage(1);
              setSelectedPostStatus(v ?? "");
            }}
          />
        </div>
        <div className="w-full md:w-1/4">
          <Dropdown
            placeHolder="Filter by category"
            name="selectedCategory"
            options={Categories}
            clearable={true}
            activeId={selectedCategory}
            handleDropdownChange={(n, v: any) => {
              setCurrentPage(1);
              setSelectedCategory(v ?? 0);
            }}
          />
        </div>
      </div>

      <div className="text-nowrap">
        <div className="w-full overflow-x-auto bg-white px-4 py-2 mt-2 rounded-md shadow-md">
          <table className="min-w-full table-auto mt-4 text-sm text-nowrap">
            <thead>
              <tr>
                <th className="text-left pr-2 py-1">Img</th>
                <th className="text-left px-2 py-1">Title</th>
                <th className="text-left px-2 py-1">Author Name</th>
                <th className="text-left px-2 py-1">Created At</th>
                <th className="text-left px-2 py-1">Category Name</th>
                <th className="text-left px-2 py-1">Status</th>
                <th className="text-left px-2 py-1">isActive</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((e, i) => (
                <tr className="text-[#6A6A6A] text-xs" key={i}>
                  <td className="pr-2 py-1">
                    <img
                      className="h-14 w-14 rounded-md object-cover"
                      src={`https://localhost:44385/${e?.postImg}`}
                      alt="Post Img"
                    />
                  </td>
                  <td className="px-2 py-1">{e.postTitle}</td>
                  <td className="px-2 py-1">{e.AuthorName}</td>
                  <td className="px-2 py-1">
                    {moment(e?.CreatedAt).fromNow()}
                  </td>
                  <td className="px-2 py-1">{e.CategoryName}</td>
                  <td className="font-semibold px-2 py-1">
                    {e.isApproved === "Pending" ? (
                      <p className="text-yellow-700">Pending</p>
                    ) : e.isApproved === "Approved" ? (
                      <p className="text-green-700">Approved</p>
                    ) : (
                      <p className="text-red-700">Rejected</p>
                    )}
                  </td>
                  <td className="px-2 py-1 font-semibold">
                    {e.ActiveStatus ? (
                      <p className="text-green-700">Active</p>
                    ) : (
                      <p className="text-red-700">Not Active</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {currentPosts.length > 0 && (
          <div className="flex md:items-end text-xs justify-between w-full md:flex-row flex-col items-center">
            <div className="mt-5">
              Showing {currentPosts.length} posts out of {mappedData.length}
            </div>
            <div className="flex items-center justify-center mt-2">
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
  );
};

export default page;
