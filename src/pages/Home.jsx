import React from "react";
import PostSide from "../components/PostSide/PostSide";
import ProfileSide from "../components/profileSide/ProfileSide";
import RightSide from "../components/RightSide/RightSide";
import "./Home.css";
import Navbar from "../components/Navbar/Navbar";
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="Home">
        <ProfileSide />
        <PostSide />
        <RightSide />
      </div>
    </div>
  );
};

export default Home;
