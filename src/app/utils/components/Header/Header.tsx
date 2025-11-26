"use client";
import { useEffect, useState } from "react";
import { FaUser, FaSignOutAlt, FaBars } from "react-icons/fa";
import BlogLogo from "../../../../../public/assets/blogLogo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RiArrowDropDownLine } from "react-icons/ri";
import useHelper from "../../../../../Helper/helper";
import NotificationBell from "../NotificationBell/NotificationBell";

const Header = () => {
  const router = useRouter();
  const helper = useHelper();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  function handleLogout() {
    if (helper.getData("RoleId") === "1") {
      localStorage.clear();
      router.push("/Login");
    } else {
      localStorage.clear();
      router.push("/");
    }
  }
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      {/* Logo */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          // onClick={() => setIsOpened(false)}
        />
      )}
      <div className="flex items-center">
        <Image
          src={BlogLogo}
          alt="logo"
          className="w-[100px] cursor-pointer"
          onClick={() => router.push("/Home")}
        />
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-2">
        {/* Notification */}
        {helper.getData("token") && (
          <NotificationBell accessToken={helper.getData("token")} />
        )}

        {/* Write / Login */}
        <div>
          {helper.getData("token") ? (
            <button
              onClick={() => {
                router.push("/WritePost/Create");
                setMenuOpen(false);
              }}
              className={`relative inline-flex xs:items-center mt-2 justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300`}
            >
              <span
                className={`relative px-4 py-2 rounded-md w-full transition-all ease-in duration-75 hover:bg-transparent hover:text-white bg-white text-black group-hover:bg-transparent group-hover:text-white`}
              >
                Write
              </span>
            </button>
          ) : (
            <button
              onClick={() => {
                router.push("/Login");
              }}
              className={`relative inline-flex xs:items-center mt-2 justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300`}
            >
              <span
                className={`relative px-4 py-2 rounded-md w-full transition-all ease-in duration-75 hover:bg-transparent hover:text-white bg-white text-black group-hover:bg-transparent group-hover:text-white`}
              >
                Login
              </span>
            </button>
          )}
        </div>

        {/* Profile Dropdown */}
        {helper.getData("token") && (
          <div className="relative">
            <div
              onClick={toggleDropdown}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-md"
            >
              {helper.getData("ProfilePhoto") ? (
                <>
                  {helper.getData("isGoogle") == "true" && helper.getData("ProfilePhoto").substring(0,5) == "https" ? (
                    <img
                      src={helper.getData("ProfilePhoto")}
                      alt="profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <img
                      src={`${helper.GetUrl()}/${helper.getData(
                        "ProfilePhoto"
                      )}`}
                      alt="profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                </>
              ) : (
                <FaUser className="text-gray-600" />
              )}
              <span className="text-gray-800 font-medium">
                {helper.getData("userName")}
              </span>
              <RiArrowDropDownLine className="text-gray-600 text-xl" />
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-44 border border-gray-100 overflow-hidden">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    router.push("/Profile");
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <FaUser className="mr-2" /> Profile
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center gap-4">
        {helper.getData("token") && (
          <NotificationBell accessToken={helper.getData("token")} />
        )}
        <FaBars
          className="text-2xl cursor-pointer text-gray-700"
          onClick={toggleMenu}
        />
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 w-72 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <span className="text-lg font-semibold">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-500 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col px-6 py-4 gap-4 overscroll-y-auto">
          {helper.getData("token") ? (
            <>
              {/* <button
                onClick={() => {
                  router.push("/WritePost/Create");
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium shadow hover:from-purple-700 hover:to-blue-600"
              >
                Write
              </button> */}
              <button
                onClick={() => {
                  router.push("/WritePost/Create");
                  setMenuOpen(false);
                }}
                className={`relative inline-flex xs:items-center mt-2 justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300`}
              >
                <span
                  className={`relative px-4 py-2 rounded-md w-full transition-all ease-in duration-75 hover:bg-transparent hover:text-white bg-white text-black group-hover:bg-transparent group-hover:text-white`}
                >
                  Write
                </span>
              </button>

              <hr />

              <div className="flex items-center gap-3">
                {helper.getData("ProfilePhoto") ? (
                  <>
                  {helper.getData("isGoogle") == "true" && helper.getData("ProfilePhoto").substring(0,5) == "https" ? (
                    <img
                      src={helper.getData("ProfilePhoto")}
                      alt="profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <img
                      src={`${helper.GetUrl()}/${helper.getData(
                        "ProfilePhoto"
                      )}`}
                      alt="profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                </>
                ) : (
                  <FaUser className="text-lg text-gray-600" />
                )}
                <span className="font-medium">
                  {helper.getData("userName")}
                </span>
              </div>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/Profile");
                }}
                className="flex items-center gap-2 px-4 py-2 text-left rounded hover:bg-gray-100"
              >
                <FaUser /> Profile
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-2 px-4 py-2 text-left rounded hover:bg-gray-100 text-red-600"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                router.push("/Login");
              }}
              className={`relative inline-flex xs:items-center mt-2 justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300`}
            >
              <span
                className={`relative px-4 py-2 rounded-md w-full transition-all ease-in duration-75 hover:bg-transparent hover:text-white bg-white text-black group-hover:bg-transparent group-hover:text-white`}
              >
                Login
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
