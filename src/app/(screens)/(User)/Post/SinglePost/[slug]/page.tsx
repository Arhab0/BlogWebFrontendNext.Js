"use client";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import moment from "moment";
import Menu from "../../Menu/Menu";
import { useRouter } from "next/navigation";
import useHelper from "../../../../../../../Helper/helper";
import Header from "@/app/utils/components/Header/Header";
import { jsPDF } from "jspdf"; // Import jsPDF
import html2canvas from "html2canvas"; // Import html2canvas
import BladeLoader from "@/app/utils/Loaders/BladeLoader";

type PageProps = {
  params: {
    slug: any;
  };
};

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

const page = ({ params }: PageProps) => {
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLLoading] = useState(false);
  const router = useRouter();
  const postId = parseInt(params.slug);
  const [post, setPost] = useState<Record>();
  const helper = useHelper();

  const fetchData = async () => {
    setLoading(true);
    helper.xhr
      .Get(
        "/Posts/GetPostById",
        helper.GetURLParamString({ id: postId }).toString()
      )
      .then((res) => {
        var data = res[0];
        setPost(data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [postId]);

  const downloadPDF = () => {};

  return (
    <>
      <Header />
      {loading ? (
        <h1 className="text-5xl font-semibold text-center">Fetching data...</h1>
      ) : (
        <div className="px-6 py-10">
          <div className="max-w-7xl">
            <div className="w-[100%] flex md:flex-row gap-11 flex-col">
              <div className="md:w-[70%] w-full">
                <div className="mt-9" id="post-content">
                  <img
                    className="w-full md:h-auto rounded-md object-cover"
                    src={`https://localhost:44385/${post?.postImg}`}
                    alt=""
                  />
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
