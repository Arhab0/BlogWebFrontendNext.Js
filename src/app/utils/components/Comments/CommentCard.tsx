import { useEffect, useState } from "react";
import moment from "moment";
import ReplyList from "./ReplyList";
import ReplyForm from "./ReplyForm";
import useHelper from "../../../../../Helper/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  comment: any;
  loggedInUserId: number;
  onCommentUpdated: () => void;
}

const CommentCard = ({ comment, loggedInUserId, onCommentUpdated }: Props) => {
  const [showReplies, setShowReplies] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(comment.comment);
  const [reloadReplies, setReloadReplies] = useState(false);

  const helper = useHelper();

  const handleDelete = () => {
    helper.xhr
      .Post(
        "/Comment/DeleteComment",
        helper.ConvertToFormData({ id: comment.commentId })
      )
      .then(() => onCommentUpdated());
  };

  const handleUpdate = () => {
    if (newText.trim() === "") {
      toast.error("Please enter a post title", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const updateComment = {
      Id: comment.commentId,
      Comment1: newText,
    };
    helper.xhr
      .Post(
        "/Comment/UpdateComment",
        helper.ConvertToFormData({ updateComment })
      )
      .then(() => {
        setEditing(false);
        onCommentUpdated();
      });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md shadow-sm">
      <ToastContainer style={{ marginTop: "30px", zIndex: 99999 }} />
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <img
            src={`https://localhost:44385/${comment.ProfilePic}`}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-base">{comment.userName}</p>
              <p>
                {comment.IsEdited === true && (
                  <span className="text-gray-700 text-xs">( edited )</span>
                )}
              </p>
            </div>
            <p className="text-sm text-gray-500">
              {moment(comment.CommentAt).fromNow()}
            </p>
          </div>
        </div>
        {comment.userId === loggedInUserId && (
          <div className="relative">
            <button
              className="text-sm text-gray-500"
              onClick={() => setEditing(!editing)}
            >
              ⋮
            </button>
          </div>
        )}
      </div>
      {editing ? (
        <div className="mt-3">
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <div className="flex gap-2 mt-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={handleUpdate}
            >
              Save
            </button>
            <button
              className="bg-gray-300 px-3 py-1 rounded"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-2">{comment.comment}</p>
      )}

      <div className="mt-3">
        <button
          onClick={() => setShowReplies(!showReplies)}
          className="text-sm text-blue-600"
        >
          {/* Show replies */}
          {showReplies ? <></> : "Show replies"}
        </button>
      </div>

      {showReplies && (
        <div className="mt-4">
          <ReplyList
            commentId={comment.commentId}
            postId={comment.postId}
            loggedInUserId={loggedInUserId}
            onReplyUpdated={onCommentUpdated}
            reloadTrigger={reloadReplies}
            setReloadReplies={setReloadReplies}
          />

          <ReplyForm
            commentId={comment.commentId}
            postId={comment.postId}
            onReplyAdded={() => setReloadReplies((prev) => !prev)}
          />
        </div>
      )}
      <p
        onClick={() => setShowReplies(!showReplies)}
        className="text-sm text-blue-600 cursor-pointer mt-2 text-end"
      >
        {showReplies ? "Hide replies" : ""}
      </p>
    </div>
  );
};

export default CommentCard;
