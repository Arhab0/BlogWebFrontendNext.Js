import React, { useEffect } from "react";

interface Props {
  TabsList: Tab[];
  activeTabIndex: string;
  changeTab: (newTabIndex: string) => void;
}

type Tab = {
  name: string;
  isProgressed: boolean;
};

const ProgressStepper = ({ TabsList, activeTabIndex, changeTab }: Props) => {
  return (
    <ol
      className={`flex items-center flex-wrap w-full p-3 font-barlow gap-2  font-medium text-center text-gray-500  shadow-sm sm:text-base sm:p-4 sm:gap-4 rtl:gap-reverse overflow-x-auto`}
    >
      {TabsList.map((tab: Tab, i: number) => (
        <li
          className={`flex items-center ${
            tab.isProgressed && "text-themeColor"
          } ${tab.isProgressed ? "text-sm" : "text-xs"} ${
            tab.isProgressed ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          key={i}
          onClick={() => {
            if (tab.isProgressed) {
              changeTab(i.toString());
            }
          }}
        >
          <span
            className={`flex items-center justify-center w-4 h-4 me-2 border ${
              tab.isProgressed ? "border-themeColor" : "border-gray-500"
            } rounded-full shrink-0 ${
              tab.isProgressed ? "text-xs" : "text-[10px]"
            }`}
          >
            {i + 1}
          </span>
          {tab.name.split(" ")[0]}{" "}
          <span className="hidden sm:inline-flex sm:ms-2 text-nowrap">
            {tab.name.split(" ").slice(1).join(" ")}
          </span>
          {i != TabsList.length - 1 && (
            <svg
              className="w-2 h-2 ms-2 sm:ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 12 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m7 9 4-4-4-4M1 9l4-4-4-4"
              />
            </svg>
          )}
        </li>
      ))}
    </ol>
  );
};

export default ProgressStepper;
