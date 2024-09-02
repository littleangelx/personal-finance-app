"use client";

import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isMinimised, setIsMinimised] = useState(false);

  const toggleMinimised = () => {
    setIsMinimised((is) => !is);
  };

  return (
    <SidebarContext.Provider value={{ isMinimised, toggleMinimised }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useMinimised = () => useContext(SidebarContext);
