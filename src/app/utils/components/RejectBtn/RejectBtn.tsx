import BladeLoader from "@/app/utils/Loaders/BladeLoader";
import React from "react";

interface Props {
  text: string;
  clickEvent: () => void;
  disabled?: boolean;
  isCruding?: boolean;
}

const RejectBtn = ({ text, clickEvent, disabled, isCruding }: Props) => {
  return (
    <div className="w-full">
      <button
        onClick={clickEvent}
        disabled={disabled || isCruding}
        className="bg-[#F93B3B] btnHeight text-nowrap flex-1 w-full text-xs text-white font-normal py-2 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-red-600"
      >
        {isCruding ? <BladeLoader /> : text}
      </button>
    </div>
  );
};

export default RejectBtn;
