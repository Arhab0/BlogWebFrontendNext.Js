"use client";
import SideMenu from "../../../../app/utils/components/SideMenu/SideMenu";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { Menu } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function SideMenuLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [path, setPath] = useState<string[]>([]);
  const [isOpened, setIsOpened] = useState(true);

  useEffect(() => {
    setPath(pathname.split("/").slice(1));

    // Handle initial sidebar state based on screen size
    const handleResize = () => {
      setIsOpened(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]);

  const formatCamelCase = (str: string) => {
    return str.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
  };

  return (
    <div className="flex min-h-screen h-full flex-1 bg-[#F5F5F9] relative">
      {/* Overlay for mobile */}
      {isOpened && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpened(false)}
        />
      )}

      {/* Mobile hamburger */}
      {!isOpened && (
        <button
          className="fixed top-4 right-4 z-40 md:hidden bg-white p-2 rounded-md shadow-md"
          onClick={() => setIsOpened(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Sidebar */}
      <div className="fixed md:sticky top-0 h-full z-40">
        <SideMenu isOpened={isOpened} setIsOpened={setIsOpened} />
      </div>

      {/* Main Content */}
      <div
        className={`w-full flex-1 flex flex-col overflow-y-auto transition-all duration-300 
          ${isOpened ? "md:ml-[1dvw] xl:ml-[1dvw]" : "ml-0 md:ml-[10px]"}`}
      >
        <div className="px-0 md:px-5 flex-1 font-montserrat py-3">{children}</div>
      </div>
    </div>
  );
}
