import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthenticationLayout: React.FC<Props> = ({ children }) => {
  return <div className="flex-1 h-full">{children}</div>;
};

export default AuthenticationLayout;
