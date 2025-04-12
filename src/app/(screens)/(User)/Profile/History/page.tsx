"use client";
import React, { useEffect, useState } from "react";
import useHelper from "../../../../../../Helper/helper";
import { useRouter } from "next/navigation";
import moment from "moment";
import { FaUser } from "react-icons/fa";

interface Records {
  Id: number;
  Title: string;
  postImg: string;
  userImg: string;
  LastViewed: string;
  AuthorName: string;
}
const page = () => {
  const helper = useHelper();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Records[]>([]);
  const fetchData = async () => {
    setLoading(true);
    helper.xhr
      .Get("/Profile/GetHistoryPost")
      .then((res) => {
        // console.log(res);
        setPosts(res.post);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen py-5 w-full px-4">
      {loading ? (
        <div className="loader"></div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-600 text-lg font-medium">
          No history "🧐"
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:my-0 my-3">
          {posts.map((item, index) => (
            <div
              key={index}
              className="flex cursor-pointer flex-col justify-between bg-[#F5F5F9] max-w-sm h-auto p-6 border border-gray-200 rounded-lg shadow-sm hover:bg-[#eff0f2]"
              onClick={() => router.push(`/ViewPost/${item.Id}`)}
            >
              <img
                src={`https://localhost:44385/${item.postImg}`}
                className="rounded-md object-cover h-48 w-full mb-4"
                alt="Post Image"
              />

              <div className="flex items-center gap-4">
                {item?.userImg ? (
                  <img
                    src={`https://localhost:44385/${item?.userImg}`}
                    className="w-10 h-10 rounded-full"
                    alt="Author"
                  />
                ) : (
                  <FaUser className="w-10 h-10 text-gray-500" />
                )}
                <div>
                  <span className="font-semibold text-base">
                    {item?.AuthorName}
                  </span>
                </div>
              </div>

              <h5 className="my-2 text-sm tracking-tight text-gray-700">
                {item.Title}
              </h5>

              <span className="text-gray-600">
                {moment(item.LastViewed).fromNow()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
