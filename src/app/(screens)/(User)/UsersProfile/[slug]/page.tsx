"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useHelper from "../../../../../../Helper/helper";
import { FaUserPen } from "react-icons/fa6";
import { MdGridView, MdViewList } from "react-icons/md";
import Posts from "../Posts/Posts";
import FollowList from "../FollowList/FollowList";
import Header from "@/app/utils/components/Header/Header";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

interface User {
  Id: number;
  FullName: string;
  PhoneNo: string;
  Email: string;
  Country: string;
  State: string;
  City: string;
  ProfilePic: string;
  Age: number;
  Dob: string;
  Gender: string;
  Followers: number;
  Following: number;
  PostCount: number;
}
interface Records {
  Id: number;
  Title: string;
  Description: string;
  Img: string;
  CreatedAt: string;
  isActive: boolean;
  IsApproved: boolean;
}

const page = () => {
  const params = useParams();
  const slug = params?.slug;
  const userId = Number(slug);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const helper = useHelper();
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Records[]>([]);
  const [activeSection, setActiveSection] = useState("posts");
  const [viewMode, setViewMode] = useState<string>("list");
  const [open, setOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followStatus, setFollowStatus] = useState(false);
  const [isFollowChanged, setIsFollowChanged] = useState("null");

  const fetchData = async () => {
    setLoading(true);
    Promise.all([
      helper.xhr.Get(
        "/Profile/GetAllPostOfUser",
        helper.GetURLParamString({ id: userId }).toString()
      ),
      helper.xhr.Get(
        "/Profile/GetUserInfo",
        helper.GetURLParamString({ id: userId }).toString()
      ),
    ])
      .then(([postsRes, userInfoRes]) => {
        setPosts(postsRes);
        setUser(userInfoRes);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
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

  const handleFollowChange = () => {
    helper.xhr
      .Post(
        "/Follow/AddFollow",
        helper.ConvertToFormData({ id: userId, check: followStatus })
      )
      .then(() => getFollowData(userId))
      .catch((err) => {})
      .finally(() => {
        fetchFollowAfterChange();
        setIsFollowChanged("null");
      });
  };

  function fetchFollowAfterChange() {
    helper.xhr
      .Get(
        "/Profile/GetUserInfo",
        helper.GetURLParamString({ id: userId }).toString()
      )
      .then((res) => {
        setUser({
          ...res,
        });
      });
  }

  useEffect(() => {
    fetchData();
    getFollowData(userId);
  }, []);

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
        <div className="min-h-screen py-5 max-w-6xl mx-auto px-4">
          <div className="px-4 py-6 border-b border-gray-300">
            <div className="flex flex-col md:flex-row items-center gap-5 w-full md:mx-auto">
              {user?.ProfilePic ? (
                <img
                  src={`${helper.GetUrl()}/${user?.ProfilePic}`}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border border-gray-300"
                  alt=""
                />
              ) : (
                <FaUser />
              )}

              <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <p className="text-lg font-semibold text-gray-800">
                    {user?.FullName}
                  </p>
                  {helper.getData("token") &&
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
                  </div>}
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-800">
                      {user?.PostCount}
                    </span>{" "}
                    Posts
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">
                      {user?.Followers}
                    </span>{" "}
                    Followers
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">
                      {user?.Following}
                    </span>{" "}
                    Following
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-9 mt-2">
            <div className="flex items-center gap-2">
              <p
                className={`${
                  activeSection === "posts"
                    ? "font-bold border-b border-b-black"
                    : ""
                } cursor-pointer`}
                onClick={() => setActiveSection("posts")}
              >
                Posts
              </p>
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 px-3 py-2 border rounded-md bg-white hover:bg-gray-100"
                >
                  {viewMode === "grid" ? <MdGridView /> : <MdViewList />}
                </button>

                {open && (
                  <div className="absolute mt-2 w-auto border rounded bg-white shadow-md z-50">
                    <div
                      className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setViewMode("grid");
                        setOpen(false);
                      }}
                    >
                      <MdGridView />
                    </div>
                    <div
                      className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setViewMode("list");
                        setOpen(false);
                      }}
                    >
                      <MdViewList />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p
              className={`${
                activeSection === "followers"
                  ? "font-bold border-b border-b-black"
                  : ""
              } cursor-pointer`}
              onClick={() => setActiveSection("followers")}
            >
              Followers
            </p>
            <p
              className={`${
                activeSection === "following"
                  ? "font-bold border-b border-b-black"
                  : ""
              } cursor-pointer`}
              onClick={() => setActiveSection("following")}
            >
              Following
            </p>
          </div>

          <div className="mt-5">
            {activeSection === "posts" && (
              <Posts ViewMode={viewMode} userId={userId} />
            )}
            {activeSection === "following" && (
              <FollowList
                FollowType={activeSection as "followers" | "following"}
                userId={userId}
                Name={user?.FullName}
                refreshTrigger={isFollowChanged}
              />
            )}
            {activeSection === "followers" && (
              <FollowList
                FollowType={activeSection as "followers" | "following"}
                userId={userId}
                Name={user?.FullName}
                refreshTrigger={isFollowChanged}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default page;
