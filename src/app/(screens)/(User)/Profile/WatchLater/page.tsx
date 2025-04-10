"use client";
import React, { useEffect, useState } from "react";
import useHelper from "../../../../../../Helper/helper";
import { useRouter } from "next/navigation";
import moment from "moment";
import { IoCreateOutline } from "react-icons/io5";
interface Records {
  postId: number;
  Title: string;
  postImg: string;
}
const page = () => {
  const helper = useHelper();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Records[]>([]);

  const fetchData = async () => {
    setLoading(true);
    helper.xhr
      .Get("/Profile/GetWatahLaterPosts")
      .then((res) => {
        if (Array.isArray(res)) {
          setPosts(res);
        }
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
    <div>
      {loading ? (
        <h1 className="text-5xl font-semibold text-center">Fetching data...</h1>
      ) : posts.length === 0 ? (
        <h1 className="text-5xl font-semibold text-center">
          No post for watch later 🙁
        </h1>
      ) : (
        <div className="min-h-screen flex w-full px-4 my-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:my-0 my-3">
            {posts?.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer bg-[#F5F5F9] max-w-sm h-[315px] p-6 border border-gray-200 rounded-lg shadow-sm hover:bg-[#eff0f2]"
                onClick={() => {
                  router.push(`/Post/SinglePost/${item.postId}`);
                }}
              >
                <img
                  src={`https://localhost:44385/${item.postImg}`}
                  className="rounded-md object-cover h-48 w-full mb-4"
                  alt="Post Image"
                />
                <h5 className="mb-2 text-base font-bold tracking-tight text-gray-800">
                  {item.Title}
                </h5>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
