import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import {
  Navbar,
  PostDetails,
  Sidebar,
  Home,
  Profile,
  Account,
  Auth,
  Faq,
  Users,
} from "./components";

import { getPosts } from "./actions/posts";
import { useDispatch } from "react-redux";
import { useStateContext } from "./context/ContextProvider";
import { getUsers } from "./actions/auth";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const { activeMenu, data, setActiveMenu } = useStateContext();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    JSON.parse(localStorage.getItem("profile"));
    dispatch(getUsers());
    dispatch(getPosts());
  }, [location, dispatch, data]);

  const AuthProtected = ({ children }) => {
    if (!user?.result) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  };
  const UserProtected = ({ children }) => {
    if (user?.result) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  };
  const AdminProtected = ({ children }) => {
    if (user?.result.isAdmin) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  };
  return (
    <div className="flex relative">
      {!user?.result && setActiveMenu(false)}
      <>
        {activeMenu ? (
          <div className="w-72 fixed sidebar">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 ">
            <Sidebar />
          </div>
        )}
      </>

      <div
        className={`min-h-screen w-full  ${
          activeMenu ? " md:ml-72" : "flex-2"
        }`}
      >
        <div className="fixed md:static navbar w-full">
          <Navbar />
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/account"
              element={
                <UserProtected>
                  <Account />
                </UserProtected>
              }
            />

            <Route
              path="/search"
              element={
                <UserProtected>
                  <Home />
                </UserProtected>
              }
            />
            <Route
              path="/auth"
              element={
                <AuthProtected>
                  <Auth />
                </AuthProtected>
              }
            />
            <Route
              path="/faq"
              element={
                <UserProtected>
                  <Faq />
                </UserProtected>
              }
            />
            <Route
              path="/users"
              element={
                <AdminProtected>
                  <Users />
                </AdminProtected>
              }
            />
            <Route
              path="/profile"
              element={
                <UserProtected>
                  <Profile />
                </UserProtected>
              }
            />
            <Route
              path="/post/:id"
              element={
                <UserProtected>
                  <PostDetails />
                </UserProtected>
              }
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
