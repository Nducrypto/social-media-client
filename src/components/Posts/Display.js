import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./display.css";
import Post from "./Post/Post";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../actions/auth";

const Display = ({ setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const name = `${user?.result.firstName} ${user?.result.lastName}`;
  const { posts, isLoading } = useSelector((state) => state?.allPosts);
  const { singleUser, allUsers } = useSelector((state) => state.authReducer);
  const trendingTopics = [
    "#TravelAdventures",
    "#FoodieFinds",
    "#TechTalks",
    "#FitnessGoals",
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const creator = user?.result._id;

  const following = () => {
    for (const user of allUsers) {
      const matchingIds = user?.followers.filter((id) => id === creator);
      return matchingIds;
    }
  };

  const viewProfile = () => {
    navigate(
      `/profile?firstName=${user?.result.firstName}&lastName=${user.result.lastName}&creator=${user.result.creator}`
    );
  };

  useEffect(() => {
    if (creator) {
      dispatch(getUser(creator));
    }
  }, [creator, dispatch]);

  return isLoading ? (
    <div style={{ textAlign: "center", marginTop: "8rem" }}>
      <div className="post-loader-container">
        <div className="post-custom-loader"></div>
      </div>
    </div>
  ) : (
    <div className="Post-container">
      <div className="left-panel">
        <div>
          <div className="image-name-wrapper" onClick={viewProfile}>
            <img src={user?.result.profilePics} alt="" />

            <div className="username">{name}</div>
          </div>

          <div className="followers">
            {singleUser?.followers?.length}{" "}
            {singleUser?.followers?.length > 1 ? "followers" : "follower"}
          </div>
          <div className="following">
            <span>{following()?.length}</span> Following
          </div>
        </div>
      </div>
      <div className="middle-panel">
        {!posts?.length && !isLoading ? (
          <h1>No Post</h1>
        ) : (
          posts
            ?.sort((a, b) => (a._id > b._id ? -1 : +1))
            .map((post) => (
              <div key={post._id}>
                <Post post={post} setCurrentId={setCurrentId} />
              </div>
            ))
        )}
      </div>

      <div className="right-panel">
        <div className="trending-topics">
          <h3>Trending Topics</h3>
          <ul>
            {trendingTopics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Display;
