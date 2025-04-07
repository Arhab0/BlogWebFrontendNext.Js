"use client";
import Image from "next/image";
import React from "react";
import warning from "../../../../assets/warning.svg";
import eye from "../../../../assets/showEye.svg";
import { useRouter } from "next/navigation";

interface Props {
  heading: string;
  hoverHeading?: string;
  link?: string;
  firstColor: string;
  secondColor: string;
  number: number;
  openingBalance?: number;
}

const card = ({
  heading,
  hoverHeading = "",
  link = "",
  firstColor,
  secondColor,
  number,
  openingBalance,
}: Props) => {
  const router = useRouter();
  return (
    <div
      className={`bg-gradient-to-br ${firstColor} ${secondColor} rounded-lg text-white w-full flex flex-col justify-center items-start p-3`}
    >
      <div className="flex justify-between items-center w-full mb-2">
        <p className="text-sm">{heading}</p>
        {hoverHeading && (
          <>
            {hoverHeading === "Opening" ? (
              <div className="flex flex-col justify-center">
                <div className="relative sm:max-w-xl sm:mx-auto">
                  <div className="group cursor-pointer relative inline-block text-center">
                    <div
                      data-tooltip-target="tooltip-light"
                      data-tooltip-style="light"
                      // type="button"
                      className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-1 px-2 text-center"
                    >
                      <div className="flex items-center justify-between space-x-2 w-fit p-1 bg-[#FF8F10] rounded-md text-white shrink-0">
                        <p className="truncate text-xs">{hoverHeading}</p>
                        <Image
                          src={warning}
                          height={14}
                          width={14}
                          alt="Opening Balance"
                        />
                      </div>
                    </div>
                    <div className="opacity-0 w-52 h-auto bg-white border border-[#FF8F10] text-black text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-[80%] md:-left-1/2 px-3 pointer-events-none">
                      <p className="text-[10px]">
                        Opening Balance of Copies{`\n`}
                        <span className="font-medium text-sm">{openingBalance?.toLocaleString()}</span>
                      </p>
                      <svg
                        className="absolute text-[#FF8F10] h-2 w-full left-0 top-full"
                        x="0px"
                        y="0px"
                        viewBox="0 0 255 255"
                        xmlSpace="preserve"
                      >
                        <polygon
                          className="fill-current"
                          points="0,0 127.5,127.5 255,0"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p
                className="flex items-center gap-1 cursor-pointer text-xs"
                onClick={() => router.push(link)}
              >
                <span className="hover:underline">View All</span>
                <Image src={eye} height={8} width={12} alt="eye" />
              </p>
            )}
          </>
        )}
      </div>
      <h1 className="text-3xl">{number?.toLocaleString()}</h1>
    </div>
  );
};

export default card;
