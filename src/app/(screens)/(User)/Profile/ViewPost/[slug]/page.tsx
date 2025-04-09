"use client";
import moment from "moment";
import { useParams } from "next/navigation";
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
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const params = useParams();
  const slug = params?.slug;
  const postId = Number(slug);
  const [post, setPost] = useState<Record>();
  const helper = useHelper();
  const [options, setOptions] = useState([
    { label: "🟢 Active", value: true },
    { label: "🔴 De-Activate", value: false },
  ]);
  const [selectedOpton, setSelectedOption] = useState<boolean>(false);

  const fetchData = async () => {
    setDataLoading(true);
    helper.xhr
      .Get(
        "/Posts/GetPostById",
        helper.GetURLParamString({ id: postId }).toString()
      )
      .then((res) => {
        var data = res[0];
        setPost(data);
        setSelectedOption(data?.IsActive);
      })
      .catch((err) => {})
      .finally(() => {
        setDataLoading(false);
      });
  };

  function ChangeActiveStatus() {
    setLoading(true);
    const data = {
      id: postId,
      status: selectedOpton,
      userid: post?.userId,
    };

    if (selectedOpton !== post?.IsActive) {
      helper.xhr
        .Post("/Profile/ChangeActiveStatus", helper.ConvertToFormData(data))
        .then((res) => {
          console.log(res);
          if (
            res.message ===
            "Can't change the status of this post. It has rejected by Admin!"
          ) {
            toast.error(res.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (res === true) {
            toast.success("Post has been Activated", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            toast.success("Post has been De-Activated", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
          fetchData();
        })
        .catch((err) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    fetchData();
  }, [postId]);

  function Submit() {}
  return (
    <>
      {dataLoading ? (
        <div className="text-center text-gray-500 font-bold text-lg">
          Fetching Data...
        </div>
      ) : (
        <div className="min-h-screen py-5 w-full px-4">
          <ToastContainer style={{ marginTop: "30px", zIndex: 99999 }} />
          <img
            className="w-full md:h-auto rounded-md object-cover"
            src={`https://localhost:44385/${post?.postImg}`}
            alt=""
          />
          <div className="flex items-center justify-between flex-wrap md:my-2 my-3">
            <div className="flex items-center gap-x-2">
              <CiCalendar />
              <p className="text-sm">
                posted {moment(post?.CreatedAt).fromNow()}
              </p>
            </div>

            <div className="flex items-center justify-end md:my-0 my-3">
              <div>
                <button
                  className={`relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300`}
                >
                  <span
                    className={`relative px-8 py-1 rounded-md transition-all items-center ease-in duration-75 ${
                      loading
                        ? "bg-transparent text-white"
                        : "bg-white text-black group-hover:bg-transparent group-hover:text-white"
                    }`}
                    onClick={Submit}
                  >
                    {loading ? (
                      <BladeLoader />
                    ) : (
                      <div className="flex items-center gap-2">
                        <FiEdit2 />
                        <p>Edit</p>
                      </div>
                    )}
                  </span>
                </button>
              </div>
              <div>
                {post?.IsApproved === true ? (
                  <Dropdown
                    placeHolder="Categories"
                    name="selectedRegion"
                    options={options}
                    activeId={selectedOpton}
                    handleDropdownChange={(n, v: any) => {
                      setSelectedOption(v);
                      ChangeActiveStatus();
                    }}
                  />
                ) : post?.IsApproved === null ? (
                  <span className="text-yellow-700">Pending</span>
                ) : (
                  <span className="text-red-700">Rejected</span>
                )}
              </div>
            </div>
          </div>
          <h1 className="font-bold text-2xl mb-9">{post?.Title}</h1>
          <div
            className="md:text-xl text-lg post-description overflow-x-hidden overflow-y-auto whitespace-pre-wrap break-words text-justify"
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
