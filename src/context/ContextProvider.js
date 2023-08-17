import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [search, setSearch] = useState("");
  const [screenSize, setScreenSize] = useState(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("profile"));

  const location = useLocation();

  useEffect(() => {
    JSON.parse(localStorage.getItem("profile"));
  }, [location]);

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
        search,
        setSearch,
        snackBarOpen,
        setSnackBarOpen,

        loggedInUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// DIS CODE BELOW WILL ENABLE U TO USE UR CONTEXT IN SIDERBAR ND ANYWR
export const useStateContext = () => useContext(StateContext);
