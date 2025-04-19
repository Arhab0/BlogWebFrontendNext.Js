"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useHelper from "../../../../../../Helper/helper";
import { FaUserPen } from "react-icons/fa6";
import { MdGridView, MdViewList } from "react-icons/md";
import Posts from "./Posts/Posts";
import FollowList from "./FollowList/FollowList";

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

const MyProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const helper = useHelper();
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Records[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("posts");
  const [viewMode, setViewMode] = useState<string>("list");
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setLoading(true); // optional if you want to show loading

    Promise.all([
      helper.xhr.Get("/Profile/GetAllPostOfUser"),
      helper.xhr.Get("/Profile/GetUserInfo"),
    ])
      .then(([postsRes, userInfoRes]) => {
        setPosts(postsRes);

        // Uncomment and modify as needed:
        setUser(userInfoRes);
        // setSelectedImage(userInfoRes.ProfilePic);

        console.log(userInfoRes);
        console.log(postsRes);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="min-h-screen py-5 w-full mx-auto px-4">
          <div className="px-4 py-6 border-b border-gray-300">
            <div className="flex flex-col md:flex-row items-center gap-5 w-full md:mx-auto">
              <img
                src={`https://localhost:44385/${user?.ProfilePic}`}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border border-gray-300"
                alt="Profile"
              />

              <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <p className="text-lg font-semibold text-gray-800">
                    {user?.FullName}
                  </p>
                  <button
                    className="flex items-center gap-1 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-md transition-all"
                    onClick={() => router.push(`/Profile/UpdateProfile`)}
                  >
                    <FaUserPen className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
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
            {activeSection === "posts" && <Posts ViewMode={viewMode} />}
            {activeSection === "following" && (
              <FollowList FollowType={activeSection} />
            )}
            {activeSection === "followers" && (
              <FollowList FollowType={activeSection} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MyProfile;
