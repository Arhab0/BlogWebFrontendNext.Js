import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});
import { barGraphOptions } from "@/app/(AuthPages)/Signup/interfaces";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { data } from "../AttendanceDivTag/data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  Label: string[];
  Data: number[];
}

const BarGraphBlueAndGray = ({ Label, Data }: Props) => {
  const [barData, setBarData] = useState({
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        categoryPercentage: 0.8, // notice here
        barPercentage: 0.8,
        backgroundColor: ["rgba(33, 89, 173, 1)", "rgb(136,136,136)"],
        borderColor: ["rgba(33, 89, 173, 1)", "rgb(136,136,136)"],
        barThickness: 40,
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    setBarData({
      labels: Label,
      datasets: [
        {
          data: Data,
          categoryPercentage: 0.8,
          barPercentage: 0.8,
          backgroundColor: ["rgba(33, 89, 173, 1)", "rgb(136,136,136)"],
          borderColor: ["rgba(33, 89, 173, 1)", "rgb(136,136,136)"],
          barThickness: 40,
          borderWidth: 1,
        },
      ],
    });
  }, [Label,Data]);
  return (
    <div className="flex-1">
      <Bar className="bar-chart" data={barData} options={barGraphOptions} />
    </div>
  );
};

export default BarGraphBlueAndGray;
