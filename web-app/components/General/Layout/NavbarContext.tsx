"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type NavbarInfo = {
  baseHref?: string;
  detailedLocation?: string;
  furtherSuggestions?: ReactNode[];
};

type NavbarContextType = {
  info: NavbarInfo;
  setInfo: (info: NavbarInfo) => void;
  resetInfo: () => void;
};

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [info, setInfo] = useState<NavbarInfo>({});

  const resetInfo = () => setInfo({});

  return (
    <NavbarContext.Provider value={{ info, setInfo, resetInfo }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = (): NavbarContextType => {
  const context = useContext(NavbarContext);
  if (!context)
    throw new Error("useNavbar must be used within a NavbarProvider");
  return context;
};
