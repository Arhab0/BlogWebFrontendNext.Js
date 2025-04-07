import React from "react";
import { TeacherAllotmentDivProps } from "./data";

const TeacherAllotmentDiv = (props: TeacherAllotmentDivProps) => {
  const {
    allotment,
    checked,
    unchecked,
    duration,
    allotmentDate,
    allotmentTime,
  } = props;
  return (
    <div className="bg-white flex-1 h-full my-7 shadow-2xl rounded-xl">
      <div className="flex w-1/4 justify-between px-7">
        <p className="text-xl">AIOU-9394</p>
        <p className="text-gray-500 text-lg">Course Name</p>
      </div>
      <div
        className={`font-alata h-[90%] w-full flex flex-1 items-center justify-between space-x-5 px-7 py-4`}
      >
        <div className="space-y-2 w-1/3">
          <p className="text-5xl">{allotment}</p>
          <hr></hr>
          <p className="text-gray-500">Allotment</p>
        </div>
        <div className="space-y-2 w-1/3">
          <p className="text-5xl">{checked}</p>
          <hr></hr>
          <p className="text-gray-500">Checked</p>
        </div>
        <div className="space-y-2 w-1/3">
          <p className="text-5xl">{unchecked}</p>
          <hr></hr>
          <p className="text-gray-500">Unchecked</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherAllotmentDiv;
