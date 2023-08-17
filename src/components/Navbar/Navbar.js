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
  Badge,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AccountCircle,
  Search,
  Settings,
  Notifications as NotifyIcon,
} from "@mui/icons-material";
import { getPostsBySearch } from "../../actions/posts";
import { useStateContext } from "../../context/ContextProvider";
import { LOGOUT } from "../../constants/actionTypes";
// import useGenerateNotification from "../Notifications/useGenerateNotification";
// import Notifications from "../Notifications/Notifications";

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
  const {
    search,
    setSearch,
    loggedInUser,
    setActiveMenu,
    screenSize,
    setScreenSize,
  } = useStateContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const { notification } = useSelector((state) => state.timeline);

  // const { notificationCount } = useGenerateNotification(allPosts, loggedInUser);

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
      `/profile?firstName=${loggedInUser?.result?.firstName}&lastName=${loggedInUser?.result?.lastName}&creator=${loggedInUser?.result?._id}`
    );
  };

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <AppBar position="static" sx={{ bgcolor: "darkblue" }}>
      <Toolbar>
        {isSmallScreen && (
          <NavButton
            title="Menu"
            customFunc={() =>
              setActiveMenu((prevActiveMenu) => !prevActiveMenu)
            }
            color="white"
            icon={<AiOutlineMenu />}
          />
        )}
        <Typography
          onClick={() => navigate("/")}
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
        >
          Mabench
        </Typography>
        {loggedInUser?.result && (
          <Badge badgeContent={notification?.length} color="primary">
            <NotifyIcon onClick={() => navigate("/notification")} />
          </Badge>
        )}
        {loggedInUser?.result ? (
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
        {loggedInUser?.result ? (
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
                  Profile
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
