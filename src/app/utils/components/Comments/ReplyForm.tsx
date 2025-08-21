import { useState } from "react";
import useHelper from "../../../../../Helper/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReplyForm = ({
  commentId,
  postId,
  onReplyAdded,
}: {
  commentId: number;
  postId: number;
  onReplyAdded: () => void;
}) => {
  const [text, setText] = useState("");
  const helper = useHelper();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (text.trim() === "") {
      toast.error("Please enter a reply", {
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
      CommentId: commentId,
      PostId: postId,
      Reply: text,
    };
    helper.xhr
      .Post("/Comment/AddReplyComment", helper.ConvertToFormData({ comment }))
      .then(() => {
        setText("");
        onReplyAdded();
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
       <ToastContainer style={{ zIndex: 99999 }} />
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Write a reply..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
      >
        Reply
      </button>
    </form>
  );
};

export default ReplyForm;
