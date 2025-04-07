import BladeLoader from "@/app/utils/Loaders/BladeLoader";
import React from "react";

interface Props {
  text: string;
  clickEvent: () => void;
  disabled?: boolean;
  isCruding?: boolean;
}

const SuccessBtn = ({ text, clickEvent, disabled, isCruding }: Props) => {
  return (
      <div className="w-full">
        <button
          onClick={clickEvent}
          disabled={disabled || isCruding}
          className="bg-[#3B9404] hover:bg-[#498524] btnHeight text-nowrap whitespace-nowrap flex-1 w-full text-xs  text-white font-normal py-2 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-[#327a06]"
        >
          {isCruding ? <BladeLoader /> : text}
        </button>
      </div>
  );
};

export default SuccessBtn;
