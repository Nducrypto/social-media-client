import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { links } from "./Links";
import { Tooltip } from "@mui/material";
import Auth from "../Auth/Auth";
import { useStateContext } from "../../context/ContextProvider";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("profile"));
  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 500) {
      setActiveMenu(false);
    }
  };

  // ====BACKGROUNDCOLOR
  const handleBackgroundColor = (title) => {
    if ((location.pathname === "/") & (title === "Home")) {
      return "orange";
    } else if ((location.pathname === "/account") & (title === "Account")) {
      return "orange";
    } else if ((location.pathname === "/faq") & (title === "FAQ")) {
      return "orange";
    } else if (!user.result.isAdmin & (title === "Users")) {
      return null;
    } else {
      return "darkgrey";
    }
  };

  // ====BACKGROUNDCOLOR
  // const handleBackgroundColor = (item) => {
  //   if ((item & currentColor) & (item === "Home")) {
  //     return "orange";
  //   } else if ((item === currentColor) & (item === "Account")) {
  //     return "orange";
  //   } else if ((item === currentColor) & (item === "FAQ")) {
  //     return "orange";
  //   } else {
  //     return "darkgrey";
  //   }
  // };

  const activeLink = "flex  pl-4 rounded-lg text-md m-2";

  const normalLink = "flex  pl-4 rounded-lg   hover:bg-secondary-dark-bg m-2";

  return (
    <>
      <div
        className="ml-3 h-screen md:overflow-hidden overflow-auto 
    md:hover:overflow-auto pb-10"
      >
        {!user?.result ? (
          <>
            <Tooltip title="Menu" position="BottomCenter">
              <button
                style={{ float: "right", color: "white" }}
                type="button"
                onClick={() =>
                  setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                }
                className="text-xl rounded-full p-3 mt-4 block "
              >
                <MdOutlineCancel />
              </button>
            </Tooltip>
            <Auth />
          </>
        ) : (
          activeMenu && (
            <>
              <div className="flex justify-between items-center gap-3">
                <Link
                  to="/"
                  onClick={handleCloseSidebar}
                  className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-slate-900"
                >
                  <span style={{ color: "white" }}>Mabench</span>
                </Link>

                <Tooltip title="Menu" position="BottomCenter">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                    }
                    className="text-xl rounded-full p-3 mt-4 block "
                  >
                    <MdOutlineCancel />
                  </button>
                </Tooltip>
              </div>

              <div className="mt-10">
                {links.map((item, i) => (
                  <div key={i}>
                    <NavLink
                      to={`/${item.url}`}
                      key={i}
                      onClick={() => {
                        handleCloseSidebar(true);
                      }}
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                      style={{
                        backgroundColor: handleBackgroundColor(item.title),
                      }}
                    >
                      <p
                        style={{ color: "black" }}
                        className="m-3 mt-4 capitalize"
                      >
                        {!user?.result?.isAdmin && item.title === "Users"
                          ? null
                          : item.title}
                      </p>
                    </NavLink>
                  </div>
                ))}
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default Sidebar;
