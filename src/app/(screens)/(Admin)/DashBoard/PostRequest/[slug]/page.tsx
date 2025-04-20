"use client";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import useHelper from "../../../../../../../Helper/helper";
import BladeLoader from "@/app/utils/Loaders/BladeLoader";
import { FiEdit2 } from "react-icons/fi";
import Dropdown from "@/app/utils/components/Dropdown/Dropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiCalendar } from "react-icons/ci";

interface Record {
  postId: number;
  Title: string;
  Description: string;
  postImg: string;
  CreatedAt: string;
  AuthorName: string;
  IsActive: boolean;
  IsApproved: boolean;
  userId: number;
}
const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const params = useParams();
  const slug = params?.slug;
  const postId = Number(slug);
  const [post, setPost] = useState<Record>();
  const helper = useHelper();
  const [options, setOptions] = useState([
    { label: "Approve / Reject", value: "" },
    { label: "🟢 Approve", value: "true" },
    { label: "🔴 Reject", value: "false" },
  ]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [statusChanged, setStatusChanged] = useState("null");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const fetchData = async () => {
    setDataLoading(true);
    helper.xhr
      .Get(
        "/Posts/GetPostById",
        helper.GetURLParamString({ id: postId }).toString()
      )
      .then((res) => {
        var data = res;
        setPost(data);
      })
      .catch((err) => {})
      .finally(() => {
        setDataLoading(false);
      });
  };

  useEffect(() => {
    if (statusChanged !== "null") {
      ChangeActiveStatus();
    }
  }, [statusChanged]);

  function ChangeActiveStatus() {
    helper.xhr
      .Post(
        "/Admin/ApprovePost",
        helper.ConvertToFormData({
          id: postId,
          check: selectedOption === "true" ? true : false,
          reason: rejectionReason,
        })
      )
      .then((res) => {
        //console.log(res);
      })
      .catch((err) => {})
      .finally(() => {
        router.back();
      });
  }

  useEffect(() => {
    fetchData();
  }, [postId]);

  return (
    <>
      {dataLoading ? (
        <div className="loader"></div>
      ) : (
        <div className="min-h-screen py-5 w-full px-4">
          {showRejectModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">
                  Reason for Rejection
                </h2>
                <textarea
                  className="w-full border p-2 rounded-md min-h-[120px]"
                  placeholder="Type your reason here..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
                <div className="flex justify-end mt-4 gap-3">
                  <button
                    onClick={() => {
                      setShowRejectModal(false);
                    }}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowRejectModal(false);
                      setStatusChanged("false");
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
          <p className="mb-4 mt-2">
            <span
              className="hover:underline cursor-pointer text-blue-600"
              onClick={() => router.back()}
            >
              Back to list
            </span>
          </p>
          <ToastContainer style={{ marginTop: "30px", zIndex: 99999 }} />
          {/* <div className="w-full aspect-[16/9]">
            <img
              className="w-full h-full object-cover rounded-md"
              src={`https://localhost:44385/${post?.postImg}`}
              alt="Post Image"
            />
          </div> */}
          <img
            className="w-full max-h-[45rem] object-fill rounded-md"
            src={`https://localhost:44385/${post?.postImg}`}
            alt="Post Image"
          />

          <div className="flex items-center justify-between flex-wrap md:my-2 my-3">
            <div className="flex items-center gap-x-2">
              <CiCalendar />
              <p className="text-sm">
                posted {moment(post?.CreatedAt).fromNow()}
              </p>
            </div>

            <div className="flex items-center justify-end md:my-0 my-3">
              <Dropdown
                placeHolder="Categories"
                name="selectedOption"
                options={options}
                activeId={selectedOption}
                handleDropdownChange={(n, v: any) => {
                  setSelectedOption(v);
                  if (v === "false") {
                    setShowRejectModal(true);
                  } else {
                    setStatusChanged("true");
                  }
                }}
              />
            </div>
          </div>
          <h1 className="font-bold text-2xl mb-9">{post?.Title}</h1>
          <div
            className="prose prose-sm md:prose-base max-w-none overflow-x-hidden overflow-y-auto prose-p:my-2 prose-li:my-1"
            dangerouslySetInnerHTML={{
              __html: post?.Description || "",
            }}
          />
        </div>
      )}
    </>
  );
};

export default page;
