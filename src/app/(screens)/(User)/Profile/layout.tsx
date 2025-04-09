"use client";
import SideMenu from "../../../../app/utils/components/SideMenu/SideMenu";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function SideMenuLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [path, setPath] = useState<string[]>([]);

  useEffect(() => {
    setPath(pathname.split("/").slice(1));
  }, [pathname]);

  const formatCamelCase = (str: string) => {
    return str.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
  };

  return (
    <div className="flex min-h-screen h-full flex-1 bg-[#F5F5F9]">
      <div className="sticky top-0 h-full hidden md:block">
        <SideMenu />
      </div>
      <div className="w-full flex-1 flex flex-col overflow-y-auto py-5 px-3 md:px-0">
        <p className="px-0 md:px-5 text-xs text-[#575757] mb-1.5">
          {path.map((item, index) => (
            <span
              key={index}
              className={index === path.length - 1 ? "font-bold text-black" : ""}
            >
              {formatCamelCase(item)}
              {index !== path.length - 1 && " / "}
            </span>
          ))}
        </p>
        <div className="px-0 md:px-5 flex-1 font-alata">{children}</div>
      </div>
    </div>
  );
}
