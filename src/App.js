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
import Notifications from "./components/Notifications/Notifications";
import { AdminProtected, AuthProtected, UserProtected } from "./Utils/utils";

const App = () => {
  const location = useLocation();
  const page = new URLSearchParams(location.search).get("page") || 1;
  const { activeMenu, setActiveMenu, loggedInUser } = useStateContext();

  const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
    dispatch(getUsers());
  }, [dispatch, page]);

  return (
    <div className="flex relative">
      {!loggedInUser?.result && setActiveMenu(false)}
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
              path="/notification"
              element={
                <UserProtected>
                  <Notifications />
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
