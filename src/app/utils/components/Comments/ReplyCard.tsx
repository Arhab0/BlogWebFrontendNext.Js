import moment from "moment";
import useHelper from "../../../../../Helper/helper";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReplyCard = ({
  reply,
  loggedInUserId,
  onReplyUpdated,
  setReloadReplies,
}: any) => {
  const [editing, setEditing] = useState(false);
  const [newReply, setNewReply] = useState("");
  const helper = useHelper();

  const handleDelete = () => {
    helper.xhr
      .Post(
        "/Comment/DeleteReplyComment",
        helper.ConvertToFormData({ id: reply.ReplyCommentId })
      )
      .then(() => setReloadReplies((prev: boolean) => !prev));
  };

  const handleUpdate = () => {
    // console.log(reply);
    if (!newReply.trim()) {
      toast.error("Your reply field is empty", {
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
    const comment = {
      Id: reply.ReplyCommentId,
      Reply: newReply,
    };
    helper.xhr
      .Post(
        "/Comment/UpdateReplyComment",
        helper.ConvertToFormData({ comment })
      )
      .then(() => {
        setEditing(false);
        setReloadReplies((prev: boolean) => !prev);
        onReplyUpdated();
      });
  };

  return (
    <div className="bg-gray-100 p-3 rounded">
       <ToastContainer style={{ zIndex: 99999 }} />
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <img
            src={`${helper.GetUrl()}/${reply.RepliedByProfilePic}`}
            alt="Reply User"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <p className="font-semibold">{reply.RepliedByUsername}</p>
              {reply.IsEdited && (
                <span className="text-gray-800 text-xs">( edited )</span>
              )}
            </div>
            <p className="text-sm text-gray-500">
              {moment(reply.RepliedAt).fromNow()}
            </p>
          </div>
        </div>
        {reply.RepliedById === loggedInUserId && (
          <div className="text-sm text-gray-500">
            <button
              onClick={() => {
                setNewReply(reply.Reply);
                setEditing(!editing);
              }}
            >
              ⋮
            </button>
          </div>
        )}
      </div>
      {editing ? (
        <div className="mt-2">
          <textarea
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <div className="flex gap-2 mt-2">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded"
              onClick={handleUpdate}
            >
              Save
            </button>
            <button
              className="bg-gray-300 px-2 py-1 rounded"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-2">{reply.Reply}</p>
      )}
    </div>
  );
};

export default ReplyCard;
