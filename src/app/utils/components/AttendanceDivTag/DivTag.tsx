import React from "react";
import { DivTagProps } from "./type";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dynamic from "next/dynamic";
import "chart.js/auto";
import { data } from "./data";
import Dropdown from "../Dropdown/Dropdown";
import Metrics from "../EvaluatorProfileComponents/EvaluatorMetrics";
import { changeDateFormat } from "../../../../../Helper/DateFormats";
import BarGraphBlueAndGray from "../Graphs/BarGraphBlueAndGray";

const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});

function DivTag({
  bgColor,
  value,
  setValue,
  setActiveCenter,
  calendar,
  primaryColor,
  secondarycolor,
  heading,
  hrBorder,
  percentage,
  dropdownField,
  dropdownValues,
  activeIdDropdown,
  enrollment,
  attendance,
  region,
  scannigHub,
  absent,
}: DivTagProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div
      className={`${bgColor} ${
        bgColor === "bg-[#2159AD]" ? "text-white" : "text-black"
      } border rounded-xl my-3`}
    >
      <div className="grid grid-cols-1 md:grid-cols-[60%_40%] px-8">
        <div
          className={`flex ${
            !heading && !dropdownField && !activeIdDropdown
              ? "items-end w-full"
              : " flex-col justify-between"
          }`}
        >
          {heading && !dropdownField && (
            <>
              {calendar ? (
                <p className="ml-3 mt-5 mb-2 text-lg">
                  Till {changeDateFormat(heading)}
                </p>
              ) : (
                <p className="ml-3 mt-5 mb-2 text-lg">
                  On {changeDateFormat(heading)}
                </p>
              )}
            </>
          )}
          {dropdownField && activeIdDropdown && (
            <div className="w-full md:w-2/3 flex mx-5 my-3 justify-between items-center">
              <div className="flex-1">
                <Dropdown
                  name="Center"
                  label="Center"
                  options={dropdownValues}
                  activeId={activeIdDropdown}
                  handleDropdownChange={(n, v) => {
                    setActiveCenter && setActiveCenter(Number(v));
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 p-3 flex-wrap w-full">
            <Metrics
              color={primaryColor == "text-white" ? "white" : "black"}
              metric={enrollment}
              heading="Enrollment"
            />
            <Metrics
              color={primaryColor == "text-white" ? "white" : "black"}
              metric={attendance}
              heading="Attendance"
            />
            <Metrics
                color={primaryColor == "text-white" ? "white" : "black"}
                metric={absent}
                heading="Absent"
              />
            {/* {present !== undefined && (
            )} */}
          </div>
        </div>
        <div
          className={`font-alata flex-1  gap-4 ${primaryColor} ${
            primaryColor == "text-white" ? "p-3" : "p-3"
          }`}
        >
          {calendar ? (
            <div className="bg-transparent text-xs flex justify-end">
              <Calendar
                className="!max-w-[250px] !w-full text-black text-xs"
                locale="en-US"
                calendarType="iso8601"
                value={value}
                onChange={(e: any) => {
                  setValue !== undefined && setValue(e);
                }}
              />
            </div>
          ) : (
            <div className="grid grid-cols-[70%_20%] items-center">
              <BarGraphBlueAndGray
                Label={["Enrollment", "Attendance"]}
                Data={[enrollment, attendance]}
              />
              {percentage && !isNaN(Number(percentage)) && (
                <p className="text-3xl text-[#2159AD] text-right">
                  {percentage}%
                </p>
              )}
              {/* <Bar className="bar-chart" data={data} options={options} /> */}
            </div>
          )}
        </div>
      </div>
      {(region || scannigHub) && (
        <div className="md:flex justify-evenly w-1/2 mx-5 mb-3">
          <p>
            Region : <span className="text-gray-500">{region}</span>
          </p>
          <p>
            Scanning Hub : <span className="text-gray-500">{scannigHub}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default DivTag;
