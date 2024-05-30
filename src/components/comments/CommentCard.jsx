import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../actions/PostsAction";

export default function CommentCard({
  username,
  comment,
  replies,
  userId,
  createdAt,
  updatedAt,
  commentId,
  user,
  setReply,
}) {
  const dispatch = useDispatch();
  const handleReply = async (e) => {
    e.preventDefault();

    const reply = e.target[0].value;

    const newReply = {
      reply,
      user,
      commentId,
    };

    await axios.post("https://cse-sdp-2.vercel.app/reply", newReply);
    //update the post redux
    setReply((prev) => [...prev, newReply]);

    e.target[0].value = "";
  };

  //filter replies by commentId
  const filteredReplies = replies.filter(
    (reply) => reply.commentId === commentId
  );

  return (
    <div className="mt-6">
      <div className="w-fit">
        <div className="flex items-center gap-2">
          <img
            className="w-8 h-8 rounded-full mb-auto mt-2"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt=""
          />

          <div>
            <h1 className="text-sm">{username}</h1>
            <p className="text-md font-medium p-2 rounded-lg bg-slate-200 text-slate-800">
              {comment}
            </p>
            <p className="text-sm text-slate-500">
              {Date(createdAt).split("GMT")[0]}
            </p>
            <form
              onSubmit={handleReply}
              className="text-sm text-slate-500 flex items-center gap-2 mt-2"
            >
              reply
              <input
                type="text"
                className="text-sm text-slate-500 outline-none border rounded p-2 mb-1"
                placeholder="add a reply"
                name="reply"
              />
            </form>
          </div>
        </div>

        <div className="ml-20">
          {filteredReplies.map((reply) => (
            <div>
              <div className="h-5 bg-indigo-500 rounded-full w-[1.6px] ml-2"></div>
              <h1 className="text-xs">{reply.user.fullName}</h1>
              <p className="text-md font-medium  rounded-lg  text-slate-800">
                {reply.reply}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
