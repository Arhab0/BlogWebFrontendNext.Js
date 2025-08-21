"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useHelper from "../../../../../../Helper/helper";
import moment from "moment";
import SearchInputTag from "@/app/utils/components/SearchInputTag/SearchInputTag";
import Eye from "../../../../../../public/assets/eye.svg";
import Edit from "../../../../../../public/assets/edit.svg";

interface Records {
  AuthorName: string;
  postId: number;
  postTitle: string;
  CreatedAt: string;
  postImg: string;
  CategoryName: string;
  ReasonForReject: string;
  RejectCount: number;
}

const page = () => {
  const helper = useHelper();
  const router = useRouter();

  const [searchEntry, setSearchEntry] = useState<string>("");
  const [result, setResult] = useState<Records[]>([]);
  const [mappedData, setMappedData] = useState<Records[]>([]);
  const [rejectReason, setRejectReason] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
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
  }, []);

  useEffect(() => {
    if (result.length > 0) {
      SearchByKeyword();
    }
  }, [result, searchEntry]);

  function SearchByKeyword() {
    let filtered = [...result];

    if (searchEntry.trim() !== "") {
      filtered = filtered.filter((element) =>
        Object.values(element).some((value) =>
          String(value).toLowerCase().includes(searchEntry.toLowerCase())
        )
      );
    }

    setMappedData(filtered);
  }

  function FetchData() {
    helper.xhr
      .Get("/Profile/GetRejectedPosts")
      .then((res) => {
        setResult(res);
        setMappedData(res);
      })
      .catch((err) => {})
      .finally(() => {});
  }

  return (
    <div className="font-alata flex-1 h-full cursor-default">
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Reason for Rejection</h2>
            <textarea
              className="w-full border p-2 rounded-md min-h-[120px]"
              placeholder="Type your reason here..."
              value={rejectReason}
              disabled={true}
            />
            <div className="flex justify-end mt-4 gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
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

      <div className="text-nowrap">
        <div className="w-full overflow-x-auto bg-white px-4 py-2 mt-2 rounded-md shadow-md">
          <table className="min-w-full table-auto mt-4 text-sm text-nowrap">
            <thead>
              <tr>
                <th className="text-left pr-2 py-1">Img</th>
                <th className="text-left px-2 py-1">Title</th>
                <th className="text-left px-2 py-1">Posted At</th>
                <th className="text-left px-2 py-1">Category Name</th>
                <th className="text-left px-2 py-1">Reject Count</th>
                <th className="text-left px-2 py-1">Reject Reason</th>
                <th className="text-left px-2 py-1">Edit</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((e, i) => (
                <tr className="text-[#6A6A6A] text-xs" key={i}>
                  <td className="pr-2 py-1">
                    <img
                      className="h-14 w-14 rounded-md object-cover"
                      src={`${helper.GetUrl()}/${e?.postImg}`}
                      alt="Post Img"
                    />
                  </td>
                  <td className="px-2 py-1">{e.postTitle}</td>
                  <td className="px-2 py-1">
                    {moment(e?.CreatedAt).fromNow()}
                  </td>
                  <td className="px-2 py-1">{e.CategoryName}</td>
                  <td className="px-2 py-1">
                    {e.RejectCount > 0 ? e.RejectCount : 0}
                  </td>
                  <td className="px-2 py-1">
                    <Image
                      className="cursor-pointer"
                      onClick={() => {
                        setRejectReason(e.ReasonForReject);
                        setShowModal(true);
                      }}
                      src={Eye}
                      height={15}
                      width={15}
                      alt="eye"
                    />
                  </td>
                  {e.RejectCount < 2 && (
                    <td className="px-2 py-1">
                      <Image
                        className="cursor-pointer"
                        onClick={() => {
                          router.push(`/WritePost/${e.postId}`);
                        }}
                        src={Edit}
                        height={15}
                        width={15}
                        alt="eye"
                      />
                    </td>
                  )}
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
