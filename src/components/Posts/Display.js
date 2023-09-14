import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./display.css";
import Post from "./Post/Post";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../../actions/auth";
import { Following } from "../../Utils/utils";
import { postIsLoading, selectAllPosts } from "../../reducers/posts";
import { useSocketIo } from "../../actions/posts";
import { useStateContext } from "../../context/ContextProvider";

const Display = ({ setCurrentId }) => {
  useSocketIo();
  const { loggedInUser } = useStateContext();
  const { profile, allUsers } = useSelector((state) => state.authReducer);
  const allPosts = useSelector(selectAllPosts);
  const isLoading = useSelector(postIsLoading);

  const trendingTopics = [
    "#TravelAdventures",
    "#FoodieFinds",
    "#TechTalks",
    "#FitnessGoals",
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = `${loggedInUser?.result.firstName} ${loggedInUser?.result.lastName}`;

  const creator = loggedInUser?.result._id;

  const viewProfile = () => {
    navigate(`/profile?name=${name}&creator=${loggedInUser?.result?._id}`);
  };
  const location = useLocation();

  useEffect(() => {
    if (creator) {
      dispatch(getUser(creator));
    }
  }, [creator, dispatch, location.pathname]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "8rem" }}>
        <div className="post-loader-container">
          <div className="post-custom-loader"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="Post-container">
      <div className="left-panel">
        {loggedInUser?.result && (
          <div>
            <div className="image-name-wrapper" onClick={viewProfile}>
              <img src={loggedInUser?.result.profilePics} alt="" />

              <div className="username">{name}</div>
            </div>

            <div className="followers">
              {profile?.followers?.length}{" "}
              {profile?.followers?.length > 1 ? "followers" : "follower"}
            </div>
            <div className="following">
              <span>
                <Following allUsers={allUsers} creator={creator} /> following{" "}
              </span>{" "}
            </div>
          </div>
        )}
      </div>
      <div className="middle-panel">
        {!allPosts?.length && !isLoading ? (
          <h1>No Post</h1>
        ) : (
          allPosts.map((post) => (
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
