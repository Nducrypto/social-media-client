import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Button, IconButton, Input, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { getPostsBySearch } from "../../actions/posts";
// import * as actionType from "../../constants/actionTypes";
import { useStateContext } from "../../context/ContextProvider";
// import LogoutPrompt from "./LogoutPrompt";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <Tooltip title={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex h-2 right-2 top-2"
      />
      {icon}
    </button>
  </Tooltip>
);
const Navbar = () => {
  const { search, setSearch, setActiveMenu, screenSize, setScreenSize } =
    useStateContext();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const searchPost = (e) => {
    e.preventDefault();

    if (search.trim()) {
      dispatch(getPostsBySearch(search));
      navigate(`/search?searchQuery=${search || "none"}`);
      setSearch("");
    } else {
      navigate("/");
      setSearch("");
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    navigate("/");
  };
  useEffect(() => {
    JSON.parse(localStorage.getItem("profile"));
  }, [location]);

  // useEffect(() => {
  //   dispatch(getUser(id));

  //   setUser(JSON.parse(localStorage.getItem("profile")));
  // }, [location]);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [setActiveMenu, screenSize]);

  return (
    <nav
      style={{ backgroundColor: "darkblue" }}
      className="flex justify-between p-2 md:mx-6 relative w-900"
    >
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        color="white"
        icon={<AiOutlineMenu />}
      />
      {/* ======PROFILE=== */}
      {user?.result && (
        <div className="flex items-center gap-2 cursor-pointer p-1 secondary-dark-bg rounded-lg">
          <img
            src={user?.result.profilePics}
            className="rounded-full w-8 h-8"
            alt=""
            onClick={() => navigate("/account")}
          />
          <span style={{ color: "white" }} className=" font-bold mr-8 text-14">
            {user?.result.firstName} {user?.result.lastName}
          </span>
        </div>
      )}
      <div className="flex items-center gap-2 cursor-pointer p-1 secondary-dark-bg rounded-lg">
        <Input
          sx={{
            width: { xs: "6rem", md: "15rem", lg: "15rem", sm: "12rem" },
            height: "2rem",
            marginTop: "0.3rem",
            backgroundColor: "white",
          }}
          onKeyDown={handleKeyPress}
          className="placeholder:italic placeholder:text-slate-400 rounded-md py-2 pl-4 pr-3 focus:outline-none"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton
          type="submit"
          onClick={searchPost}
          sx={{
            color: "white",
          }}
        >
          <SearchIcon />
        </IconButton>
      </div>

      {/* {prompt && <LogoutPrompt logout={logout} />} */}

      {user?.result ? (
        <div className="flex gap-2 items-center cursor-pointer p-1  secondary-dark-bg rounded-lg">
          <Button
            size="small"
            sx={{
              textTransform: "capitalize",
              backgroundColor: "red",
            }}
            variant="contained"
            onClick={() => {
              logout();
              //   setPrompt(true);
            }}
            className="text-red-700 font-bold ml-1 text-14"
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2 cursor-pointer p-1  rounded-lg">
          {/* <p> */}
          <Button
            size="small"
            sx={{ textTransform: "lowerCase", marginLeft: "-1rem" }}
            variant="contained"
            onClick={() => {
              navigate("/auth");
            }}
            className="text-gray-400 font-bold ml-1 text-14"
          >
            singIn
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
