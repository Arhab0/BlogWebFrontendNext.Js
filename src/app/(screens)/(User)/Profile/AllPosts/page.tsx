"use client";
import React, { useEffect, useState } from "react";
import useHelper from "../../../../../../Helper/helper";
import { useRouter } from "next/navigation";
import moment from "moment";
import { IoCreateOutline } from "react-icons/io5";
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
  const helper = useHelper();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Records[]>([]);
  const fetchData = async () => {
    // setLoading(true);
    helper.xhr
      .Get("/Profile/GetAllPostOfUser")
      .then((res) => {
        // console.log(res);
        setPosts(res);
      })
      .catch((err) => {})
      .finally(() => {
        // setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const getText = (html: any) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent != null ? doc.body.textContent : "";
  };

  return (
    <div>
      <p
        className="flex justify-end my-2 text-blue-600"
        onClick={() => router.push("/WritePost/Create")}
      >
        <span className="flex items-center gap-2 cursor-pointer">
          <IoCreateOutline /> Create Post
        </span>
      </p>
      <div className="min-h-screen flex items-center justify-center w-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:my-0 my-3">
          {posts.map((item, index) => (
            <div
              key={index}
              className="flex cursor-pointer flex-col justify-between bg-[#F5F5F9] max-w-sm h-[450px] p-6 border border-gray-200 rounded-lg shadow-sm hover:bg-[#eff0f2]"
              onClick={() => {
                router.push(`/Profile/ViewPost/${item.Id}`);
              }}
            >
              <img
                src={`https://localhost:44385/${item.Img}`}
                className="rounded-md object-cover h-48 w-full mb-4"
                alt="Post Image"
              />
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-800">
                {item.Title}
              </h5>
              <p className="text-base text-gray-700 line-clamp-3">
                {getText(item.Description).substring(0, 50) ||
                  "No description available"}
                ...
              </p>

              <div className="flex justify-between items-center mt-4 text-sm font-medium">
                <span className="text-gray-600">
                  {moment(item.CreatedAt).fromNow()}
                </span>

                {item.IsApproved === true ? (
                  <span
                    className={
                      item.isActive === true ? "text-green-700" : "text-red-700"
                    }
                  >
                    {item.isActive === true ? "Active" : "De-Activated"}
                  </span>
                ) : item.IsApproved === null ? (
                  <span className="text-yellow-700">Pending</span>
                ) : (
                  <span className="text-red-700">Rejected</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
