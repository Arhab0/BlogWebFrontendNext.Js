import React, { useEffect, useState } from "react";
import Icon from "@/assets/yellowNotifIcon.svg";
import Image from "next/image";
import close from "@/assets/cancelRed.svg";

interface Props {
  message: string;
  heading: string;
  index: string;
  removeNotifCallback: (i: string) => void;
}

const NotifPopup = ({
  message,
  index,
  removeNotifCallback,
  heading,
}: Props) => {
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => {
      removeNotifCallback(index);
    }, 300);
  };

  useEffect(() => {
    setTimeout(() => {
      handleRemove();
    }, 3000);
  }, []);

  return (
    <div
      className={`rounded-[10px] relative bg-white text-themeColor drop-shadow-2xl px-3 py-2 w-full font-poppins transition-all duration-300 ${
        removing ? "opacity-0 scale-90" : "opacity-100 scale-100"
      }`}
    >
      <div className="flex justify-between">
        <p className="text-sm font-medium">{heading}</p>
        <div className="space-x-2 flex">
          <Image src={Icon} height={15} alt="notification" />
          <Image
            src={close}
            alt="Close"
            height={11}
            className="cursor-pointer"
            onClick={handleRemove}
          />
        </div>
      </div>
      <p className="mt-2 text-[10px] break-words">{message}</p>
    </div>
    // <div className="bg-green-100 grid grid-cols-[94%_3%] gap-1 p-2 rounded-md drop-shadow-2xl">
    //   <p className="text-[10px] break-words text-green-600 font-inter">
    //     {message}
    //   </p>
    //   <div>
    //     <Image
    //       src={close}
    //       alt="Close"
    //       height={8}
    //       className="cursor-pointer"
    //       onClick={handleRemove}
    //     />
    //   </div>
    // </div>
  );
};

export default NotifPopup;
