import { useState } from "react";
import useHelper from "../../../../../Helper/helper";

const CommentForm = ({
  postId,
  onCommentAdded,
}: {
  postId: number;
  onCommentAdded: () => void;
}) => {
  const [text, setText] = useState("");
  const helper = useHelper();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const comment = {
      comment1: text,
      PostId: postId,
    };
    helper.xhr
      .Post("/Comment/AddComment", helper.ConvertToFormData({ comment }))
      .then(() => {
        setText("");
        onCommentAdded();
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        className="w-full border p-3 rounded"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          className={`relative inline-flex items-center justify-end md:w-1/6 w-1/2 mt-2 p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300`}
        >
          <span
            className={`relative px-4 py-2 rounded-md w-full transition-all ease-in duration-75 hover:bg-transparent hover:text-white bg-white text-black group-hover:bg-transparent group-hover:text-white`}
          >
            Add comment
          </span>
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
