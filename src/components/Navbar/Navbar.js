import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AccountCircle, Search, Settings } from "@mui/icons-material";

import { getPostsBySearch } from "../../actions/posts";
import { useStateContext } from "../../context/ContextProvider";
import { LOGOUT } from "../../constants/actionTypes";

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
  const [anchorEl, setAnchorEl] = useState(null);

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
    dispatch({ type: LOGOUT });

    navigate("/");
  };
  useEffect(() => {
    JSON.parse(localStorage.getItem("profile"));
  }, [location]);

  const handleResize = useCallback(() => {
    const newScreenSize = window.innerWidth;
    setScreenSize(newScreenSize);
  }, [setScreenSize]);

  useEffect(() => {
    let resizeTimer;
    const handleResizeWithDebounce = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };
    window.addEventListener("resize", handleResizeWithDebounce);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResizeWithDebounce);
    };
  }, [handleResize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [setActiveMenu, screenSize]);

  const handleToogleMenu = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const viewProfile = () => {
    navigate(
      `/profile?firstName=${user?.result?.firstName}&lastName=${user?.result?.lastName}&creator=${user?.result?._id}`
    );
  };
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <AppBar position="static" sx={{ bgcolor: "darkblue" }}>
      <Toolbar>
        <NavButton
          title="Menu"
          customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
          color="white"
          icon={<AiOutlineMenu />}
        />
        <Typography
          onClick={() => navigate("/")}
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
        >
          Mabench
        </Typography>
        {user?.result ? (
          <div>
            {isSmallScreen ? (
              <InputBase
                sx={{
                  bgcolor: "common.white",
                  ml: 2,
                  borderRadius: "4px",
                  flexGrow: 1,
                  display: "flex",
                  [(theme) => theme.breakpoints.down("sm")]: {
                    display: "none",
                  },
                }}
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyPress}
                startAdornment={
                  <Search
                    cursor="pointer"
                    color="action"
                    onClick={searchPost}
                  />
                }
              />
            ) : (
              <InputBase
                sx={{
                  bgcolor: "common.white",
                  ml: 2,
                  borderRadius: "4px",
                  flexGrow: 1,
                }}
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyPress}
                startAdornment={<Search color="action" onClick={searchPost} />}
              />
            )}
          </div>
        ) : null}
        {user?.result ? (
          <div>
            <IconButton color="inherit" onClick={handleToogleMenu}>
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleToogleMenu}
            >
              <MenuItem
                onClick={(e) => {
                  handleToogleMenu(e);
                  viewProfile();
                }}
              >
                <Typography variant="body2" sx={{ marginRight: 1 }}>
                  {user?.result.firstName} {user?.result.lastName}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleToogleMenu}>
                <Button
                  variant="contained"
                  sx={{
                    color: "error.contrastText",
                    backgroundColor: "error.main",
                    textTransform: "none",
                  }}
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  handleToogleMenu(e);
                  navigate("/account");
                }}
              >
                <IconButton color="inherit">
                  <Settings />
                </IconButton>
                <Typography variant="body2">Settings</Typography>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            sx={{ textTransform: "capitalize" }}
            onClick={() => navigate("/auth")}
          >
            SignIn
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
