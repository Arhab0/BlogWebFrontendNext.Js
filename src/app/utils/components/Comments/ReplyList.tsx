import { useEffect, useState } from "react";
import useHelper from "../../../../../Helper/helper";
import ReplyCard from "./ReplyCard";

interface Props {
  commentId: number;
  postId: number;
  loggedInUserId: number;
  onReplyUpdated: () => void;
  reloadTrigger: boolean;
  setReloadReplies: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReplyList = ({
  commentId,
  postId,
  loggedInUserId,
  onReplyUpdated,
  reloadTrigger,
  setReloadReplies,
}: Props) => {
  const [replies, setReplies] = useState<any[]>([]);
  //   const [reloadReplies, setReloadReplies] = useState(false);

  const helper = useHelper();

  const fetchReplies = () => {
    console.log(postId, commentId);
    helper.xhr
      .Get(
        "/Comment/GetRepliedComments",
        helper.GetURLParamString({ id: postId }).toString()
      )
      .then((res) => {
        console.log("replies", res);
        setReplies(res.filter((r: any) => r.RepliedCommentId === commentId));
      });
  };

  useEffect(() => {
    fetchReplies();
  }, [reloadTrigger]);

  return (
    <div className="pl-10 space-y-4 mt-2">
      {replies.map((reply) => (
        <ReplyCard
          key={reply.ReplyCommentId}
          reply={reply}
          loggedInUserId={loggedInUserId}
          onReplyUpdated={onReplyUpdated}
          setReloadReplies={setReloadReplies}
        />
      ))}
    </div>
  );
};

export default ReplyList;
