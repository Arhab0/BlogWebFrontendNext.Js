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
  Id: number;
  FullName: string;
  Country: string;
  State: string;
  City: string;
  IsActive: boolean;
  Age: number;
  Gender: string;
  PhoneNo: string;
  PostCount: number;
  Email: string;
}

const page = () => {
  const helper = useHelper();
  const router = useRouter();
  const [options, setOptions] = useState([
    { label: "Active", value: "Active" },
    { label: "Not Active", value: "Not Active" },
  ]);
  const [selectedUserStatus, setSelectUserStatus] = useState<string>("");

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
  }, []);

  useEffect(() => {
    if (result.length > 0) {
      SearchByKeyword();
    }
  }, [result, searchEntry, selectedUserStatus]);

  function SearchByKeyword() {
    let filtered = [...result];

    if (searchEntry.trim() !== "") {
      filtered = filtered.filter((element) =>
        Object.values(element).some((value) =>
          String(value).toLowerCase().includes(searchEntry.toLowerCase())
        )
      );
    }

    if (selectedUserStatus === "Active") {
      filtered = filtered.filter((element) => element.IsActive === true);
    } else if (selectedUserStatus === "Not Active") {
      filtered = filtered.filter((element) => element.IsActive === false);
    }

    setMappedData(filtered);
  }

  function FetchData() {
    helper.xhr
      .Get("/Admin/GetUsers")
      .then((res) => {
        setResult(res);
        setMappedData(res);
      })
      .catch((err) => {})
      .finally(() => {});
  }

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
            placeHolder="Filter by user status"
            name="selectedUserStatus"
            options={options}
            clearable={true}
            activeId={selectedUserStatus}
            handleDropdownChange={(n, v: any) => {
              setCurrentPage(1);
              setSelectUserStatus(v ?? "");
            }}
          />
        </div>
      </div>

      <div className="text-nowrap">
        <div className="w-full overflow-x-auto bg-white px-4 py-2 mt-2 rounded-md shadow-md">
          <table className="min-w-full table-auto mt-4 text-sm text-nowrap">
            <thead>
              <tr>
                <th className="text-left pr-2 py-1">Name</th>
                <th className="text-left px-2 py-1">Email</th>
                <th className="text-left px-2 py-1">Phone No</th>
                <th className="text-left px-2 py-1">Gender</th>
                <th className="text-left px-2 py-1">Country</th>
                <th className="text-left px-2 py-1">State</th>
                <th className="text-left px-2 py-1">City</th>
                <th className="text-left px-2 py-1">Total Post</th>
                <th className="text-left px-2 py-1">Active Status</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((e, i) => (
                <tr className="text-[#6A6A6A] text-xs" key={i}>
                  <td className="pr-2 py-1">{e.FullName}</td>
                  <td className="px-2 py-1">{e.Email}</td>
                  <td className="px-2 py-1">{e.PhoneNo}</td>
                  <td className="px-2 py-1">{e.Gender}</td>
                  <td className="px-2 py-1">{e.Country}</td>
                  <td className="px-2 py-1">{e.State}</td>
                  <td className="px-2 py-1">{e.City}</td>
                  <td className="px-2 py-1">{e.PostCount}</td>
                  <td className="px-2 py-1 font-semibold">
                    {e.IsActive ? (
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
              Showing {currentPosts.length} users out of {mappedData.length}
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
