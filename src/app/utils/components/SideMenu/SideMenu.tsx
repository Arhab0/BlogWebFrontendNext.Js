"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { menus, MenuItem } from "../../../../../Helper/Menus";
import arrows from "../../../../assets/sideMenuToggler.svg";
import Image from "next/image";
import Link from "next/link";
import useHelper from "../../../../../Helper/helper";
import DynamicSvg from "../DynamicSvgSideMenu";

const SideMenu = () => {
  const helper = useHelper();
  const pathname = usePathname();
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [isOpened, setIsOpened] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await helper.xhr.Get("/Menu/GetAllMenus");
        if (!res?.menu) return;
        const menus = res.menu.filter((x: any) => x.ParentId !== null);
        let matchedMenu = null;
        let maxMatchLength = 0;

        for (const menu of menus) {
          if (pathname === menu.Path || pathname.startsWith(menu.Path + "/")) {
            if (menu.Path.length > maxMatchLength) {
              maxMatchLength = menu.Path.length;
              matchedMenu = menu;
            }
          }
        }

        if (matchedMenu) {
          const parentId = matchedMenu.ParentId;
          if (parentId) {
            const navRes = await helper.xhr.Get(
              "/Navigation/GetMenus",
              helper.GetURLParamString({ MenuId: parentId }).toString()
            );

            setMenuItems(
              navRes.menus.map((x: any) => ({
                ...x,
                IsActive: pathname === x.Path,
              }))
            );
          }
        }
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, [pathname]);

  return (
    <>
      {/* {menuItems.length > 0 && ( */}
      <div
        className={`bg-white p-4 font-alata font-normal text-xs text-nowrap h-full 
            ${!isOpened ? "w-[74px]" : "w-full md:w-[20dvw] xl:w-[15dvw]"} 
            transition-all duration-300 flex justify-between flex-col h-full border border-[#D7D7FB]`}
      >
        <div className="flex flex-col">
          {menuItems.map((item, index) => (
            <Link
              href={item.Path}
              title={item.MenuName}
              key={item.MenuId}
              className={`cursor-pointer flex items-center gap-2 py-3 rounded-md truncate transition-all duration-200
                  ${
                    item.IsActive
                      ? "text-themeColor font-semibold"
                      : "text-[#575757] font-light hover:text-black"
                  } ${!isOpened && "justify-center"}`}
              onClick={() => {
                setMenuItems((prev) =>
                  prev.map((x, i) => ({
                    ...x,
                    IsActive: i === index,
                  }))
                );
              }}
            >
              {/* SVG Icon Always Visible */}
              <DynamicSvg
                height={isOpened ? 10 : 16}
                isActive={item.IsActive}
                title={item.MenuName}
              />

              {/* Menu Name Hidden When Collapsed */}
              {isOpened && (
                <p className="transition-opacity duration-100 text-xs">
                  {item.MenuName}
                </p>
              )}
            </Link>
          ))}
        </div>

        <div className="w-full flex justify-end">
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
      </div>
      {/* )} */}
    </>
  );
};

export default SideMenu;
