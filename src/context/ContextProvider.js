import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [search, setSearch] = useState("");
  const [data, setData] = useState();

  const [screenSize, setScreenSize] = useState(undefined);

  const [currentColor, setCurrentColor] = useState("");

  const setColor = (color) => {
    setCurrentColor(color);

    localStorage.setItem("colorMode", color);
  };

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        data,
        setData,
        screenSize,
        setScreenSize,
        currentColor,
        setCurrentColor,
        setColor,
        search,
        setSearch,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// DIS CODE BELOW WILL ENABLE U TO USE UR CONTEXT IN SIDERBAR ND ANYWR
export const useStateContext = () => useContext(StateContext);
