import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { links } from "./Links";
import { Tooltip } from "@mui/material";
import Auth from "../Auth/Auth";
import { useStateContext } from "../../context/ContextProvide";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, setColor, screenSize, currentColor } =
    useStateContext();
  const user = JSON.parse(localStorage.getItem("profile"));
  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 500) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md m-2";

  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-md hover:bg-secondary-dark-bg m-2";

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
                        setColor(currentColor);
                        handleCloseSidebar(true);
                      }}
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : "",
                        // color: "white",
                      })}
                    >
                      <p
                        style={{ color: "white" }}
                        className="m-3 mt-4 uppercase"
                      >
                        {item.title}
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
