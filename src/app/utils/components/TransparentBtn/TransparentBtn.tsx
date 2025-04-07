import BladeLoader from "@/app/utils/Loaders/BladeLoader";
import React from "react";

interface Props {
  text: string;
  clickEvent: () => void;
  disabled?: boolean;
  isCruding?: boolean;
}

const TransparentBtn = ({ text, clickEvent, disabled, isCruding }: Props) => {
  return (
    <div className="w-full">
      <button
        onClick={clickEvent}
        disabled={disabled || isCruding}
        className={`text-blue-500 btnHeight text-nowrap text-xs btnHeight font-normal flex-1 font-alata w-full py-2 px-4 rounded shadow hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-100 bg-transparent border border-blue-500`}
      >
        {isCruding ? <BladeLoader /> : text}
      </button>
    </div>
  );
};

export default TransparentBtn;
