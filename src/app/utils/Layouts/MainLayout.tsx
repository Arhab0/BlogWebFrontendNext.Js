"use client";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default MainLayout;
