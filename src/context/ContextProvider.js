import React, { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [search, setSearch] = useState("");
  const [screenSize, setScreenSize] = useState(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const { posts, isLoading } = useSelector((state) => state.allPosts);

  const { singleUser, allUsers } = useSelector((state) => state.authReducer);

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
        singleUser,
        allUsers,
        posts,
        isLoading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// DIS CODE BELOW WILL ENABLE U TO USE UR CONTEXT IN SIDERBAR ND ANYWR
export const useStateContext = () => useContext(StateContext);
