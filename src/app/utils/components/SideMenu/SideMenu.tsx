"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { menus } from "../../../../../Helper/Menus";
import arrows from "../../../../../public/assets/sideMenuToggler.svg";
import logout from "../../../../../public/assets/logout.svg";
import Image from "next/image";
import Link from "next/link";
import DynamicSvg from "../DynamicSvgSideMenu";
import useHelper from "../../../../../Helper/helper";

interface SideMenuProps {
  isOpened: boolean;
  setIsOpened: (open: boolean) => void;
}

const SideMenu = ({ isOpened, setIsOpened }: SideMenuProps) => {
  const helper = useHelper();
  const router = useRouter();
  const pathname = usePathname();

  let MenuToMap: any[] = [];
  if (helper.getData("RoleId") === "1") {
    MenuToMap = menus.DashBoard.map((item) => ({
      ...item,
      isActive: pathname === item.path,
    }));
  } else {
    MenuToMap = menus.Profile.map((item) => ({
      ...item,
      isActive: pathname === item.path,
    }));
  }

  return (
    <div
      className={`bg-white p-4 font-alata font-normal text-xs text-nowrap min-h-screen
    h-full border border-[#D7D7FB] transition-all duration-300 flex flex-col
    ${
      !isOpened
        ? "hidden md:flex w-[74px]"
        : "w-[30vw] md:w-[20dvw] xl:w-[15dvw]"
    }
  `}
    >
      {/* Top header with toggle */}
      {helper.getData("RoleId") === "2" && (
        <>
          <div className="flex justify-end mb-4">
            <Image
              src={arrows}
              height={15}
              alt="Collapse Toggle"
              title="Collapse"
              className={`cursor-pointer transition-transform duration-100 ${
                isOpened ? "rotate-180" : ""
              }`}
              onClick={() => setIsOpened(!isOpened)}
            />
          </div>
          <hr className="mb-4" />
        </>
      )}

      {/* Scrollable middle links */}
      <div className="flex-1 overflow-y-auto">
        {MenuToMap.map((item, index) => (
          <Link
            href={item.path}
            key={index}
            className={`cursor-pointer flex items-center gap-2 py-3 rounded-md truncate 
          transition-all duration-200 ${
            item.isActive
              ? "text-themeColor font-semibold"
              : "text-[#575757] font-light hover:text-black"
          } ${!isOpened && "justify-center"}`}
            onClick={() => {
              if (window.innerWidth < 768) setIsOpened(false);
            }}
          >
            <DynamicSvg
              height={isOpened ? 10 : 16}
              isActive={item.isActive}
              title={item.label}
            />
            {isOpened && <p className="text-xs">{item.label}</p>}
          </Link>
        ))}
      </div>

      {/* Footer (logout + arrow) */}
      {helper.getData("RoleId") === "1" && (
        <div className="flex justify-between mt-4">
          <Image
            src={logout}
            height={15}
            alt="logout"
            className="cursor-pointer"
            onClick={() => {
              localStorage.clear();
              router.push("/Login");
            }}
          />
          <Image
              src={arrows}
              height={15}
              alt="Collapse Toggle"
              title="Collapse"
              className={`cursor-pointer transition-transform duration-100 ${
                isOpened ? "rotate-180" : ""
              }`}
              onClick={() => setIsOpened(!isOpened)}
          />
        </div>
      )}
    </div>
  );
};

export default SideMenu;
