import BladeLoader from "@/app/utils/Loaders/BladeLoader";
import React from "react";

interface Props {
  text: string | JSX.Element;
  clickEvent: () => void;
  disabled?: boolean;
  isCruding?: boolean;
}

const WhiteBtn = ({ text, clickEvent, disabled, isCruding }: Props) => {
  return (
    <div className="w-full">
      <button
        onClick={clickEvent}
        disabled={disabled || isCruding}
        className={`text-themeColor btnHeight text-nowrap flex-1 text-xs font-normal font-alata w-full py-2 px-4 rounded shadow hover:cursor-pointer focus:outline-none focus:ring-2  hover:bg-[#f5f5f5] bg-white
          }`}
      >
        {isCruding ? <BladeLoader /> : text}
      </button>
    </div>
  );
};

export default WhiteBtn;
