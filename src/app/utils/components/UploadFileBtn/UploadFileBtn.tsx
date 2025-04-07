import BladeLoader from "@/app/utils/Loaders/BladeLoader";
import React from "react";

interface Props {
  text: string;
  clickEvent: () => void;
  disabled?: boolean;
  isCruding?: boolean;
}

const UploadFileBtn = ({ text, clickEvent, disabled, isCruding }: Props) => {
  return (
    <div className="w-full">
      <button
        onClick={clickEvent}
        disabled={disabled || isCruding}
        className="border border-dashed btnHeight border-[#2159AD] py-2 w-full text-center bg-[#2159AD0D] text-[#2159AD] text-xs font-alata rounded-md"
      >
        {isCruding ? <BladeLoader /> : text}
      </button>
    </div>
  );
};

export default UploadFileBtn;
