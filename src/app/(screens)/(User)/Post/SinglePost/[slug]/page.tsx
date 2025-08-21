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
import CommentSection from "@/app/utils/components/Comments/CommentSection";
import { RiUserFollowLine } from "react-icons/ri";
import { RiUserUnfollowLine } from "react-icons/ri";

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
  const { slug } = useParams();
  const postId = Number(slug);
  const helper = useHelper();
  const router = useRouter();

  const [post, setPost] = useState<Record>();
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLLoading] = useState(false);

  const [isWatchLater, setIsWatchLater] = useState(false);
  const [isWatchLaterChanged, setIsWatchLaterChanged] = useState("null");
  const [status, setStatus] = useState(false);

  const [isFollowing, setIsFollowing] = useState(false);
  const [followStatus, setFollowStatus] = useState(false);
  const [isFollowChanged, setIsFollowChanged] = useState("null");

  const fetchPost = () => {
    setLoading(true);
    helper.xhr
      .Get(
        "/Posts/GetPostById",
        helper.GetURLParamString({ id: postId }).toString()
      )
      .then((res) => setPost(res))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const getFollowData = (userId: number) => {
    helper.xhr
      .Get(
        "/Follow/GetFollowerById",
        helper.GetURLParamString({ id: userId }).toString()
      )
      .then((res) => {
        setIsFollowing(res);
        setFollowStatus(res);
      })
      .catch(console.error);
  };

  const getWatchLaterData = () => {
    helper.xhr
      .Get(
        "/Profile/GetWatahLaterPostById",
        helper.GetURLParamString({ id: postId }).toString()
      )
      .then((res) => {
        //console.log(res);
        setIsWatchLater(res.isWatchLater);
      })
      .catch(console.error);
  };

  const handleWatchLater = () => {
    helper.xhr
      .Post(
        "/Posts/AddToWatchLater",
        helper.ConvertToFormData({ id: postId, check: status })
      )
      .then(() => setIsWatchLaterChanged("null"))
      .catch((err) =>
        toast.error(err, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      )
      .finally(() => {
        getWatchLaterData();
      });
  };

  const handleFollowChange = () => {
    helper.xhr
      .Post(
        "/Follow/AddFollow",
        helper.ConvertToFormData({ id: post?.userId, check: followStatus })
      )
      .then(() => getFollowData(post?.userId || 0))
      .catch((err) =>
        toast.error(err, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      )
      .finally(() => setIsFollowChanged("null"));
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  useEffect(() => {
    if (post?.userId) {
      getWatchLaterData();
      getFollowData(post.userId);
    }
  }, [post?.userId]);

  useEffect(() => {
    if (isWatchLaterChanged !== "null") {
      handleWatchLater();
      setIsWatchLaterChanged("null");
    }
  }, [isWatchLaterChanged]);

  useEffect(() => {
    if (isFollowChanged !== "null") {
      handleFollowChange();
    }
  }, [isFollowChanged]);

  return (
    <>
      <Header />
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="px-6 py-10">
           <ToastContainer style={{ zIndex: 99999 }} />
          <div className="max-w-7xl">
            <div className="w-[100%] flex md:flex-row gap-11 flex-col">
              <div className="md:w-[70%] w-full">
                <div className="mt-7" id="post-content">
                  <img
                    className="w-full md:h-auto rounded-md object-cover"
                    src={`${helper.GetUrl()}/${post?.postImg}`}
                    alt=""
                  />
                  <div className="flex items-center justify-between flex-wrap">
                    <div className="flex items-center gap-4 mt-3">
                      {post?.userPhoto ? (
                        <img
                          src={`${helper.GetUrl()}/${post?.userPhoto}`}
                          className="w-10 h-10 rounded-full"
                          alt=""
                        />
                      ) : (
                        <FaUser />
                      )}
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <p
                            className="font-semibold text-lg text-gray-800 cursor-pointer"
                            onClick={() => {
                              if (
                                post?.userId ===
                                parseInt(helper.getData("UserId"))
                              ) {
                                router.push(`/Profile}`);
                              } else {
                                router.push(`/UsersProfile/${post?.userId}`);
                              }
                            }}
                          >
                            {post?.AuthorName}
                          </p>

                          {helper.getData("token") && post?.userId !==
                            parseInt(helper.getData("UserId")) && (
                            <div className="flex items-center gap-2">
                              {isFollowing ? (
                                <button
                                  className="flex items-center gap-1 text-sm bg-[#e5e5e5] hover:text-gray-800 text-gray-600 px-3 py-1.5 rounded-md transition"
                                  onClick={() => {
                                    setFollowStatus(false);
                                    setIsFollowChanged("false");
                                  }}
                                >
                                  <RiUserUnfollowLine className="w-4 h-4" />
                                  <span>Unfollow</span>
                                </button>
                              ) : (
                                <button
                                  className="flex items-center gap-1 text-sm bg-[#e5e5e5] hover:text-gray-800 text-gray-600 px-3 py-1.5 rounded-md transition"
                                  onClick={() => {
                                    setFollowStatus(true);
                                    setIsFollowChanged("true");
                                  }}
                                >
                                  <RiUserFollowLine className="w-4 h-4" />
                                  <span>Follow</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>

                        <p className="text-sm">
                          posted {moment(post?.CreatedAt).fromNow()}
                        </p>
                      </div>
                    </div>
                    {helper.getData("token") && post?.userId !== parseInt(helper.getData("UserId")) && (
                      <div className="flex items-center gap-2 sm:mt-0 mt-3 ">
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
                    )}
                  </div>
                  <h1 className="font-bold text-2xl mt-5">{post?.Title}</h1>
                  <div
                    className="prose prose-sm md:prose-base max-w-none overflow-x-hidden overflow-y-auto prose-p:my-2 prose-li:my-1"
                    dangerouslySetInnerHTML={{
                      __html: post?.Description || "",
                    }}
                  />
                </div>

                <CommentSection
                  postId={postId}
                  loggedInUserId={parseInt(helper.getData("UserId"))}
                />
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
