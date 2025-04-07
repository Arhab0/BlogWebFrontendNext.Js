import React from "react";
import Logo from "@/assets/logo.png";
import Image from "next/image";

const ScreenLoader = () => {
  return (
    <div className="w-screen h-screen bg-[#00000080] flex justify-center items-center absolute mb-0 top-0 left-0 z-[999]">
      <div className="relative rounded-full flex items-center justify-center h-32 w-32 bg-white">
        {/* SVG Spinner at the edge */}
        <svg
          viewBox="25 25 50 50"
          className="absolute top-0 left-0 right-0 bottom-0 w-full h-full transform -rotate-90"
        >
          <circle
            r="24.5"
            cy="50"
            cx="50"
            fill="none"
            stroke="hsl(214, 97%, 59%)"
            strokeWidth="1"
            strokeDasharray="1, 200"
            strokeDashoffset="0"
            strokeLinecap="round"
            className="animate-dash4 animate-incrementOffset"
          ></circle>
        </svg>
        <Image src={Logo} alt="logo" height={60} className="rounded-full" />
      </div>
    </div>
  );
};

export default ScreenLoader;
