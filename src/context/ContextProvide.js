import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [search, setSearch] = useState("");

  const [screenSize, setScreenSize] = useState(undefined);

  const [currentColor, setCurrentColor] = useState("#03C907");

  const setColor = (color) => {
    setCurrentColor(color);

    localStorage.setItem("colorMode", color);
  };

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,

        screenSize,
        setScreenSize,
        currentColor,
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
