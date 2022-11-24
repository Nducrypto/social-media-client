import React, { useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import "./App.css";

import PostDetails from "./components/PostDetails/PostDetails";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Profile from "./components/Profile/profile";
import Sidebar from "./components/Sidebar/Sidebar";
import Account from "./components/Account/Account";
// import { getUsers } from "./actions/auth";
import { getPosts } from "./actions/posts";
import { useDispatch } from "react-redux";
import { useStateContext } from "./context/ContextProvide";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const { activeMenu } = useStateContext();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    JSON.parse(localStorage.getItem("profile"));
    // dispatch(getUsers());
    dispatch(getPosts());
  }, [location, dispatch]);

  const AuthProtected = ({ children }) => {
    if (!user?.result) {
      return children;
    } else {
      return <Redirect to="/" />;
    }
  };
  const UserProtected = ({ children }) => {
    if (user?.result) {
      return children;
    } else {
      return <Redirect to="/" />;
    }
  };
  return (
    <div className="flex relative ">
      {activeMenu ? (
        // <div className="container">
        <div className="w-72 fixed sidebar bg-black">
          <Sidebar />
        </div>
      ) : (
        // </div>
        <div className="w-0 ">
          <Sidebar />
        </div>
      )}

      <div
        className={`min-h-screen w-full  ${
          activeMenu ? " md:ml-72" : "flex-2"
        }`}
      >
        <div className="fixed md:static navbar  w-full">
          <Navbar />
        </div>
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              path="/account"
              exact
              component={() => (
                <UserProtected>
                  <Account />
                </UserProtected>
              )}
            />

            <Route
              path="/search"
              exact
              component={() => (
                <UserProtected>
                  <Home />
                </UserProtected>
              )}
            />
            <Route
              path="/auth"
              exact
              component={() => (
                <AuthProtected>
                  <Auth />
                </AuthProtected>
              )}
            />
            <Route
              path="/:firstName:lastName"
              exact
              component={() => (
                <UserProtected>
                  <Profile />
                </UserProtected>
              )}
            />
            <Route
              path="/:id"
              exact
              component={() => (
                <UserProtected>
                  <PostDetails />
                </UserProtected>
              )}
            />

            {/* <Route
              path={["/creators/:name", "/ndu/:name"]}
              component={CreatorOrTag}
            /> */}

            <Route path="*" exact component={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </div>
    </div>
    // <BrowserRouter>
    //   <Container maxWidth="lg">
    //     <Navbar />

    //     <Switch>
    //       <Route path="/" exact component={() => <Redirect to="/posts" />} />
    //       <Route path="/posts" exact component={Home} />
    //       <Route path="/posts/search" exact component={Home} />
    //       <Route path="/posts/:id" exact component={PostDetails} />
    //       <Route
    //         path={["/creators/:name", "/tags/:name"]}
    //         component={CreatorOrTag}
    //       />
    //       <Route
    //         path="/auth"
    //         exact
    //         component={() => (
    //           <AuthProtected>
    //             <Auth />
    //           </AuthProtected>
    //         )}
    //       />
    //     </Switch>
    //   </Container>
    // </BrowserRouter>
  );
};

export default App;
