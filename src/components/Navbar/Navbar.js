import { AppBar, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import navlogo from "../../images/navlogo.jpg";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actionType from "../../constants/actionTypes";

import SearchIcon from "@mui/icons-material/Search";
import { getPostsBySearch } from "../../actions/posts";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [tags] = useState([]);

  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const dispatch = useDispatch();

  const history = useHistory();

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const searchPost = (e) => {
    e.preventDefault();

    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
      setSearch("");
    } else {
      history.push("/");
      setSearch("");
    }
  };

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/");

    setUser(null);
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar
      sx={{
        padding: "0rem 2rem 0 0",
        backgroundColor: "red",
      }}
    >
      <div className="Navbar">
        <span className="nav-logo">
          <Link
            to="/"
            style={{
              display: "flex",
              textDecoration: "none",
              color: "white",
            }}
          >
            MABENCH
            <img
              style={{
                marginLeft: "0.5rem",
                marginTop: "3px",
                borderRadius: "9rem",
              }}
              src={navlogo}
              alt="icon"
              height="25px"
            />
          </Link>
        </span>

        {user?.result && (
          <>
            <input
              className="input"
              onKeyDown={handleKeyPress}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton
              type="submit"
              onClick={searchPost}
              sx={{ marginRight: { md: "18rem", sm: "3rem" } }}
            >
              <SearchIcon />
            </IconButton>
          </>
        )}
        <div className={`nav-items ${isOpen && "open"}`}>
          {user?.result.name}
          {user?.result && (
            <Button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              variant="contained"
              sx={{
                width: "8rem",
                height: "2rem",
                textTransform: "lowercase",
                marginLeft: { md: "5rem", sm: "5rem" },
                marginTop: { xs: "5rem", md: 0, sm: 0, lg: 0 },
              }}
            >
              Logout
            </Button>
          )}
        </div>

        {/* ==== SININ SMALL DEVICE */}
        {!user?.result && (
          <Button
            variant="contained"
            sx={{
              marginLeft: "7rem",
              display: { md: "none", lg: "none", sm: "none" },
            }}
            onClick={() => {
              history.push("/auth");
              setIsOpen(false);
            }}
          >
            signin
          </Button>
        )}

        {/* ==== SININ SMALL DEVICe */}

        {!user?.result && (
          <Button
            variant="contained"
            sx={{
              marginLeft: "7rem",
            }}
            onClick={() => {
              history.push("/auth");
              setIsOpen(false);
            }}
          >
            signin
          </Button>
        )}
        {/* ====NAV TOGGLE BAR=== */}
        <div
          className={`nav-toggle ${isOpen && "open"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* -====== NAV-TOGGLE ON SMALL DEVICE== */}
          {user?.result && <div className="bar"></div>}
        </div>
      </div>
    </AppBar>
  );
};

export default Navbar;
