import Image from "next/image";
import React from "react";

interface MetricsProps {
  metric: string | number;
  heading: string;
  color?: string;
  subHeading?: string;
  subHheadingImg?: any;
  UpperHeading?: string | any;
  isSuperHeadingLink?: boolean;
  superHeadingLinkCallback?: () => void;
}

function Metrics({
  metric,
  heading,
  color = "black",
  subHeading,
  subHheadingImg,
  UpperHeading,
  isSuperHeadingLink,
  superHeadingLinkCallback,
}: MetricsProps) {
  return (
    <div className="flex-1 w-full flex justify-end flex-col">
      <div
        className={`flex items-end pb-2 border-b border-b-[#DFDFDF] space-x-2  ${
          color == "black" ? "text-themeColor" : "text-white"
        }`}
      >
        <div className="flex flex-col w-full">
          <p
            className={`text-end w-full text-sm ${
              color == "black" ? "text-[#4C4C4C]" : "text-white"
            } ${isSuperHeadingLink && "cursor-pointer hover:underline"} `}
            onClick={superHeadingLinkCallback}
          >
            {UpperHeading}
          </p>
          <p
            className={`${
              "text-5xl"
              // metric.toString().length >= 5 ? "text-5xl" : "text-7xl"
            } ${color == "black" ? "text-black" : "text-white"}`}
            style={{ lineHeight: 1 }}
          >
            {metric.toLocaleString()}
          </p>
        </div>
        <div className="flex space-x-2">
          <p
            className={`${
              color == "black" ? "text-[#4C4C4C]" : "text-white"
            } text-xs`}
          >
            {subHeading}
          </p>

          {subHheadingImg && (
            <Image src={subHheadingImg} height={14} alt="students" />
          )}
        </div>
      </div>
      <p
        className={`text-sm ${
          color == "black" ? "text-[#4C4C4C]" : "text-white"
        }`}
      >
        {heading}
      </p>
    </div>
  );
}

export default Metrics;
