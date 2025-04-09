"use client";
import { useState } from "react";
import { FaUser, FaSignOutAlt, FaBars } from "react-icons/fa";
import BlogLogo from "../../../../../public/assets/blogLogo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RiArrowDropDownLine } from "react-icons/ri";
import useHelper from "../../../../../Helper/helper";

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

  function handleLogout() {
    localStorage.clear();
    router.push("/");
  }
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-[#f9f9f9] shadow-sm">
      <div className="flex items-center">
        <Image
          src={BlogLogo}
          className="w-[90px]"
          alt="logo"
          onClick={() => router.push("/Home")}
        />
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <div className="flex gap-2 items-center">
          {helper.getData("token") && (
            <button
              className={`relative inline-flex items-center w-full mt-2 justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300`}
            >
              <span
                className={`relative px-4 py-2 rounded-md w-full transition-all ease-in duration-75 hover:bg-transparent hover:text-white bg-white text-black group-hover:bg-transparent group-hover:text-white`}
                onClick={() => {
                  router.push("/WritePost/Create");
                }}
              >
                Write
              </span>
            </button>
          )}
          {helper.getData("token") === "" && (
            <button
              className={`relative inline-flex items-center w-full mt-2 justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300`}
            >
              <span
                className={`relative px-4 py-2 rounded-md w-full transition-all ease-in duration-75 hover:bg-transparent hover:text-white bg-white text-black group-hover:bg-transparent group-hover:text-white`}
                onClick={() => {
                  router.push("/");
                }}
              >
                Login
              </span>
            </button>
          )}
        </div>

        <div className="relative">
          <div
            onClick={toggleDropdown}
            className="flex items-center cursor-pointer"
          >
            {helper.getData("token") && (
              <>
                {helper.getData("ProfilePhoto") !== "" ? (
                  <img
                    src={`https://localhost:44385/${helper.getData(
                      "ProfilePhoto"
                    )}`}
                    alt="profile"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                ) : (
                  <FaUser className="mr-2 text-black" />
                )}
                <span className="text-black">{helper.getData("userName")}</span>
                <RiArrowDropDownLine className="text-black text-lg" />
              </>
            )}
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-md w-40 z-50">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  router.push("/Profile");
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                <FaUser className="mr-2 inline" />
                Profile
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setDropdownOpen(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                <FaSignOutAlt className="mr-2 inline" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden flex items-center">
        <FaBars className="text-2xl cursor-pointer" onClick={toggleMenu} />
      </div>

      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col items-start px-6 space-y-4">
          <button
            onClick={() => {
              router.push("/WritePost/Create");
              setMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
          >
            Write
          </button>
          <button
            onClick={() => {
              router.push("/");
              setMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
          >
            Login
          </button>

          {helper.getData("token") && (
            <>
              <hr className="w-full" />
              <div className="flex items-center gap-2">
                {helper.getData("ProfilePhoto") !== "" ? (
                  <img
                    src={`https://localhost:44385/${helper.getData(
                      "ProfilePhoto"
                    )}`}
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <FaUser className="text-lg" />
                )}
                <span>{helper.getData("userName")}</span>
              </div>

              <button
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
              >
                <FaUser className="mr-2 inline" />
                Profile
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
              >
                <FaSignOutAlt className="mr-2 inline" />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
