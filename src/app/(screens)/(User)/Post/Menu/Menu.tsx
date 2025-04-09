"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useHelper from "../../../../../../Helper/helper";

type PageProps = {
  Id: number | 0;
};

interface Records {
  Id: number;
  Title: string;
  Img: string;
}
const Menu = ({ Id }: PageProps) => {
  const helper = useHelper();
  const router = useRouter();
  const [posts, setPosts] = useState<Records[]>([]);

  function fetchData() {}
  useEffect(() => {
    fetchData();
  }, [Id]);

  return (
    <div>
      <h1 className="text-center md:border-t-0 border-t-2 md:pt-0 pt-5 font-bold md:text-2xl mb-4">
        Post you may like
      </h1>
      {posts.map((post) => (
        <div key={post.Id} className="md:mb-6 mb-3">
          <Image
            src={`https://localhost:44385/${post.Img}`}
            className="rounded"
            alt=""
          />
          <p
            onClick={() => {
              router.push(`/Post/SinglePost/${post.Id}`);
            }}
          >
            <h1 className="font-bold text-lg mt-2">{post.Title}</h1>
            <button className="my-3 px-4 py-2 rounded-md bg-[#b9e7e7] hover:-translate-y-1 duration-200">
              Read More
            </button>
          </p>
        </div>
      ))}
      <div className="flex items-center justify-center">
        <p
          onClick={() => router.push(`/Home`)}
          className="font-bold text-xl border-2 py-3 px-6 rounded-[30px] hover:border-black duration-300"
        >
          More Post
        </p>
      </div>
    </div>
  );
};

export default Menu;
