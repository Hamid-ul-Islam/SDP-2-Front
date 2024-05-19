import React, { useEffect, useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";
import Highlighter from "../syntaxHighlighter/SyntaxHighlighter";
import userPic from "../../img/img2.png";
import CommentCard from "../comments/CommentCard";
import axios from "axios";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [ownPost, setOwnPost] = useState(data.user._id === user._id);
  const [language, setLanguage] = useState(data.language);
  const [code, setCode] = useState(data.code);
  const [comments, setComments] = useState(data.comments);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    async function getComments() {
      const { data: da } = await axios.get(
        `https://cse-sdp-2.vercel.app/comment`
      );
      //filter comments by postId
      setComments(da.filter((comment) => comment.postId === data._id));
    }

    //get replies
    async function getReplies() {
      const { data: da } = await axios.get(
        `https://cse-sdp-2.vercel.app/reply`
      );
      //filter replies by postId
      setReplies(da);
    }
    getComments();
    getReplies();
  }, [data._id]);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const newComment = {
      comment: e.target[0].value,
      fullName: user.fullName,
      userId: user._id,
      postId: data._id,
    };

    await axios.post("https://cse-sdp-2.vercel.app/comment", newComment);

    //update the post redux
    setComments((prev) => [...prev, newComment]);

    e.target[0].value = "";
  };

  return (
    <div className="Post p-10">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="detail">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative">
              <img
                className="w-10 h-10 rounded-full border-2 border-orange-500"
                src="defaultProfile.png"
                alt=""
              />
              <span className="text-xs font-medium text-orange-600 px-1  bg-orange-100 absolute -top-2 left-0 w-5 h-5 rounded-full flex items-center justify-center border-t-[2px] border-orange-500">
                {data.user.batch}
              </span>
            </div>
            <div>
              <h4 className="font-bold">{data.user.fullName}</h4>
            </div>
          </div>
          {ownPost && (
            <button className="bg-red-100 text-red-600 p-2 rounded text-xs">
              Delete
            </button>
          )}
        </div>
        <span className="font-medium">{data.desc}</span>
        <div className="relative">
          <Highlighter language={language} code={code} />
          <span className="font-medium bg-transparent  absolute -top-1 left-0 rounded text-xs p-2 opacity-70">
            {language.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-10">
        <span style={{ color: "var(--gray)", fontSize: "12px" }}>
          {likes} likes
        </span>
        <span style={{ color: "var(--gray)", fontSize: "12px" }}>
          {likes} comments
        </span>
      </div>
      <div className="flex items-center gap-10">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        {/* <img src={Share} alt="" /> */}
        <img src={Comment} alt="" />
      </div>
      {/* comment box */}
      <form onSubmit={handleComment} className="flex items-center gap-4">
        <img src={userPic} className="w-10 h-10 " alt="" />
        <input
          className="rounded p-3 outline-none border w-full"
          type="text"
          placeholder="Add a comment "
          name="comment"
        />
      </form>
      {/* comments */}
      <div className="ml-14">
        {comments.map((c) => (
          <CommentCard
            key={c.userId}
            commentId={c._id}
            userId={c.userId}
            username={c.fullName}
            comment={c.comment}
            replies={replies}
            createdAt={c.createdAt}
            updatedAt={c.updatedAt}
            user={user}
            setReply={setReplies}
          />
        ))}
      </div>
    </div>
  );
};

export default Post;
