import BladeLoader from "@/app/utils/Loaders/BladeLoader";
import React from "react";

interface Props {
  text: string;
  clickEvent: () => void;
  disabled?: boolean;
  isCruding?: boolean;
}

const GrayBtn = ({ text, clickEvent, disabled, isCruding }: Props) => {
  return (
    <div className="w-full">
      <button
        onClick={clickEvent}
        disabled={disabled || isCruding}
        className={` text-white flex-1 btnHeight text-nowrap font-normal font-alata w-full py-2 px-4 rounded shadow hover:cursor-pointer focus:outline-none focus:ring-2 hover:bg-[#8A8A8A] bg-[#8A8A8A] text-xs
					}`}
      >
        {isCruding ? <BladeLoader /> : text}
      </button>
    </div>
  );
};

export default GrayBtn;
