"use client";
import { useEffect, useState } from "react";
import editLogo from "../../../../../../../public/assets/edit.svg";
import deleteLogo from "../../../../../../../public/assets/delete.svg";

import { FaUser } from "react-icons/fa";

import { MdOutlineSort } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import replyArrow from "../img/replyArrow.png";
import Image from "next/image";
import moment from "moment";
import Menu from "../../Menu/Menu";
import { useRouter } from "next/navigation";
import useHelper from "../../../../../../../Helper/helper";
import Header from "@/app/utils/components/Header/Header";

type PageProps = {
  params: {
    slug: any;
  };
};

interface Records {
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
  const router = useRouter();
  const postId = parseInt(params.slug);
  const [post, setPost] = useState<Records>();
  const helper = useHelper();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [originalComments, setOriginalComments] = useState([]);
  const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(true);
  const [commentId, setCommentId] = useState(0);
  const [isEditOn, setIsEditOn] = useState(false);
  const [editedComment, setEditComment] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [replyComments, setReplyComments] = useState([]);
  const [reply, setReply] = useState("");
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyCommentId, setReplyCommentId] = useState(0);

  // reply states
  const [isReplyDropdownMenuOpen, setIsReplyDropdownMenuOpen] = useState(false);
  const [nestedReplyCommentId, setNestedReplyCommentId] = useState(0);
  const [nestedReplyingCommentId, setNestedReplyingCommentId] = useState(0);
  const [isNestedReplyOpen, setIsNestedReplyOpen] = useState(false);
  const [isReplyEditOn, setIsReplyEditOn] = useState(false);

  const getComments = async () => {};

  const getReplyComments = async () => {};
  useEffect(() => {
    getComments();
    getReplyComments();
  }, [postId]);

  const fetchData = async () => {};
  useEffect(() => {
    fetchData();
  }, [postId]);

  const handleDelete = async () => {};

  const handleSubmitComment = async () => {};

  const handleReplyComment = async () => {};
  const handleNestedReplyComment = async () => {};

  const handleSortChange = (e: any) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
    sortAndSetComments(originalComments, newSortOrder);
  };

  const sortAndSetComments = (commentsArray: any, order: any) => {};

  useEffect(() => {
    sortAndSetComments(originalComments, sortOrder);
  }, [originalComments, sortOrder]);

  const deleteComment = async (id: any) => {};

  const deleteRepliedComment = async (id: any) => {};

  const editComment = async (id: any) => {};
  const editReplyComment = async (id: any) => {};

  return (
    <>
      <Header />
      <div className="px-6 py-32">
        <div className="max-w-7xl">
          <div className="w-[100%] flex md:flex-row gap-11 flex-col">
            <div className="md:w-[70%] w-full">
              <img
                className="w-full md:h-auto rounded-md object-cover"
                src={`${helper.GetImageUrl}/${post?.postImg}`}
                alt=""
              />
              <div className="flex items-center gap-4 mt-3">
                {post?.userPhoto ? (
                  <img
                  src={`${helper.GetImageUrl}/${post?.userPhoto}`}
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
                {helper.getData("token") &&
                  helper.getData("userName") === post?.AuthorName && (
                    <div className="flex items-center gap-1">
                      <Image
                        className="w-6 h-6"
                        src={editLogo}
                        alt=""
                        onClick={() => {
                          router.push(`/WritePost/${postId}`);
                        }}
                      />
                      <img
                        onClick={handleDelete}
                        className="cursor-pointer w-6 h-6"
                        src={deleteLogo}
                        alt=""
                      />
                    </div>
                  )}
              </div>
              <div className="mt-9">
                <h1 className="font-bold text-2xl mb-9">{post?.Title}</h1>
                <div
                  className="md:text-xl text-lg post-description overflow-x-hidden overflow-y-auto whitespace-pre-wrap break-words text-justify"
                  dangerouslySetInnerHTML={{ __html: post?.Description || "" }}
                />
              </div>
            </div>

            <div className="md:w-[30%] w-full md:-mt-6">
              <Menu Id={post?.categoryId || 0} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
