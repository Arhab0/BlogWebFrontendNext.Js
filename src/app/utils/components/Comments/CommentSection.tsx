"use client";
import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";
import useHelper from "../../../../../Helper/helper";

interface Comment {
  commentId: number;
  comment: string;
  commentAt: string;
  isEdited: boolean;
  ProfilePic: string;
  userId: number;
  userName: string;
}

interface Props {
  postId: number;
  loggedInUserId: number;
}

const CommentSection = ({ postId, loggedInUserId }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const helper = useHelper();

  const fetchComments = () => {
    helper.xhr
      .Get(
        "/Comment/GetComments",
        helper.GetURLParamString({ id: postId }).toString()
      )
      .then((res) => setComments(res))
      .catch(console.error);
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-4">
        Comments ( {comments.length} )
      </h2>
      {helper.getData("token") && <CommentForm postId={postId} onCommentAdded={fetchComments} />}
      <div className="space-y-6 mt-6">
        {comments.map((comment) => (
          <CommentCard
            key={comment.commentId}
            comment={comment}
            loggedInUserId={loggedInUserId}
            onCommentUpdated={fetchComments}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
