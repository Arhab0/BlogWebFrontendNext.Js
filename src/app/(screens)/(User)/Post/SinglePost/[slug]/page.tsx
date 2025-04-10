"use client";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import moment from "moment";
import Menu from "../../Menu/Menu";
import { useParams, useRouter } from "next/navigation";
import useHelper from "../../../../../../../Helper/helper";
import Header from "@/app/utils/components/Header/Header";
import { jsPDF } from "jspdf"; // Import jsPDF
import html2canvas from "html2canvas"; // Import html2canvas
import BladeLoader from "@/app/utils/Loaders/BladeLoader";
import AddToWatchLater from "../../../../../../../public/assets/addTobWatchLater.svg";
import WatchedLater from "../../../../../../../public/assets/WatchedLater.svg";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Record {
  postId: number;
  Title: string;
  Description: string;
  postImg: string;
  CreatedAt: string;
  Category1: string;
  categoryId: number;
  userId: number;
  userPhoto: string;
  AuthorName: string;
}

const page = () => {
  const params = useParams();
  const slug = params?.slug;
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLLoading] = useState(false);
  const router = useRouter();
  const postId = Number(slug);
  const [post, setPost] = useState<Record>();
  const helper = useHelper();
  const [isWatchLaterChanged, setIsWatchLaterChanged] = useState("null");
  const [status, setStatus] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    helper.xhr
      .Get(
        "/Posts/GetPostById",
        helper.GetURLParamString({ id: postId }).toString()
      )
      .then((res) => {
        console.log(res);
        var data = res;
        setPost(data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    getData();
  }, [postId]);

  useEffect(() => {
    if (isWatchLaterChanged !== "null") {
      handleWatchLater();
    }
  }, [isWatchLaterChanged]);

  const downloadPDF = () => {};

  function getData() {
    helper.xhr
      .Get(
        "/Profile/GetWatahLaterPostById",
        helper.GetURLParamString({ id: postId }).toString()
      )
      .then((res) => {
        // console.log(res);
        // var data = res;
        setIsWatchLater(res.isWatchLater);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  }

  function handleWatchLater() {
    helper.xhr
      .Post(
        "/Posts/AddToWatchLater",
        helper.ConvertToFormData({ id: postId, check: status })
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        toast.error(err, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .finally(() => {
        getData();
      });
  }

  return (
    <>
      <Header />
      {loading ? (
        <h1 className="text-5xl font-semibold text-center">Fetching data...</h1>
      ) : (
        <div className="px-6 py-10">
          <ToastContainer style={{ marginTop: "30px", zIndex: 99999 }} />
          <div className="max-w-7xl">
            <div className="w-[100%] flex md:flex-row gap-11 flex-col">
              <div className="md:w-[70%] w-full">
                <div className="mt-9" id="post-content">
                  <img
                    className="w-full md:h-auto rounded-md object-cover"
                    src={`https://localhost:44385/${post?.postImg}`}
                    alt=""
                  />
                  <div className="flex items-center justify-between flex-">
                    <div className="flex items-center gap-4 mt-3">
                      {post?.userPhoto ? (
                        <img
                          src={`https://localhost:44385/${post?.userPhoto}`}
                          className="w-10 h-10 rounded-full"
                          alt=""
                        />
                      ) : (
                        <FaUser />
                      )}
                      <div>
                        <span className="font-bold text-[20px]">
                          {post?.AuthorName}
                        </span>
                        <p className="text-sm">
                          posted {moment(post?.CreatedAt).fromNow()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isWatchLater == true ? (
                        <div className="flex items-center gap-2">
                          <p className="text-gray-600">Remove from</p>
                          <Image
                            src={WatchedLater}
                            height={20}
                            width={20}
                            className="cursor-pointer"
                            alt="watch later svg"
                            onClick={() => {
                              setStatus(false);
                              setIsWatchLaterChanged("false");
                            }}
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <p className="text-gray-600">Add to</p>
                          <Image
                            src={AddToWatchLater}
                            height={20}
                            width={20}
                            className="cursor-pointer"
                            alt="watch later svg"
                            onClick={() => {
                              setStatus(true);
                              setIsWatchLaterChanged("true");
                            }}
                          />
                        </div>
                      )}
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
                {/* Button to download the post as a PDF */}
                {/* <div className="flex justify-center mt-6">
                  <button
                    className={`relative inline-flex items-center w-1/2 justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300`}
                  >
                    <span
                      className={`relative px-8 py-2 rounded-md w-full transition-all ease-in duration-75 ${
                        loading
                          ? "bg-transparent text-white"
                          : "bg-white text-black group-hover:bg-transparent group-hover:text-white"
                      }`}
                      onClick={downloadPDF}
                    >
                      {pdfLoading ? "Downloading..." : "Download as PDF"}
                    </span>
                  </button>
                </div> */}
              </div>

              <div className="md:w-[30%] w-full md:-mt-6">
                <Menu CatIdProp={post?.categoryId} PostId={post?.postId} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
