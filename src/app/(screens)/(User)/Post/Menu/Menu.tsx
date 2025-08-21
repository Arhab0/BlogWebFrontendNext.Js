"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useHelper from "../../../../../../Helper/helper";

type PageProps = {
  CatIdProp?: number | 0;
  PostId?: number | 0;
};

interface Records {
  CatId: number;
  PostId: number;
  Title: string;
  Img: string;
  CategoryName: string;
}
const Menu = ({ CatIdProp, PostId }: PageProps) => {
  const helper = useHelper();
  const router = useRouter();
  const [posts, setPosts] = useState<Records[]>([]);

  const fetchData = async () => {
    helper.xhr
      .Get(
        "/Posts/GetPostByCategory",
        helper.GetURLParamString({ id: CatIdProp, postId: PostId }).toString()
      )
      .then((res) => {
        // console.log(res);
        setPosts(res);
      })
      .catch((err) => {
        // console.log(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchData();
  }, [CatIdProp, PostId]);

  return (
    <div>
      <h1 className="text-center md:border-t-0 border-t-2 md:pt-0 pt-5 font-bold md:text-2xl mb-4">
        Post you may like
      </h1>
      {posts.map((post) => (
        <div
          key={post.PostId}
          className="md:mb-6 mb-3 cursor-pointer"
          onClick={() => {
            router.push(`/Post/SinglePost/${post.PostId}`);
          }}
        >
          <img
            className="w-full md:h-auto rounded-md object-cover"
            src={`${helper.GetUrl()}/${post?.Img}`}
            alt="Blog Photo"
          />
          <h1 className="font-bold text-lg mt-2">{post.Title}</h1>
          <div className="w-full grid place-content-center md:place-content-start">
            <button
              className={`relative inline-flex xs:items-center mt-2 justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300`}
            >
              <span
                className={`relative px-4 py-2 rounded-md w-full transition-all ease-in duration-75 hover:bg-transparent hover:text-white bg-white text-black group-hover:bg-transparent group-hover:text-white`}
              >
                Read More
              </span>
            </button>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-center">
        <button
          onClick={() => {
            router.push("/Home");
          }}
          className={`relative inline-flex items-center w-28 mt-2 justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300`}
        >
          <span
            className={`relative px-4 py-2 rounded-md w-full transition-all ease-in duration-75 hover:bg-transparent hover:text-white bg-white text-black group-hover:bg-transparent group-hover:text-white`}
          >
            More Post
          </span>
        </button>
      </div>
    </div>
  );
};

export default Menu;
