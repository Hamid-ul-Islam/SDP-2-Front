import React from "react";
import "./ProfileCard.css";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/AuthActions";
import PostSide from "../PostSide/PostSide";
const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  // search param
  const params = useParams();

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <div className="ProfileCard min-w-64">
      <div className="ProfileImages h-48 flex  overflow-hidden">
        <img
          className="min-w-full object-contain"
          src={"/defaultCover.jpg"}
          alt="CoverImage"
        />
        <div className="mt-3 -mb-10 relative">
          <img
            className="!w-20 !h-20 rounded-full object-cover"
            src={"defaultProfile.png"}
            alt="ProfileImage"
          />
          <span className="bg-green-100 w-7 h-7 rounded-full p-2 text-green-600 font-bold absolute top-0 flex items-center justify-center border">
            {user.batch}
          </span>
        </div>
      </div>
      <div className="ProfileName">
        <span>{user.fullName}</span>
        <span>{user.worksAt ? user.worksAt : "Write about yourself"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          {/* for profilepage */}
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            to={`/profile/${user._id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              marginLeft: "15px",
            }}
          >
            My Profile
          </Link>
          <button
            style={{ marginTop: "10px" }}
            className="button logout-button"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
