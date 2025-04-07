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

const BarGraphGray = ({ Label, Data }: Props) => {
  const [barData, setBarData] = useState({
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        backgroundColor: ["rgba(33, 89, 173, 0.38)"],
        borderColor: ["rgba(33, 89, 173, 1)"],
        barThickness: 40,
        borderWidth: 0.15,
      },
    ],
  });

  useEffect(() => {
    setBarData({
      labels: Label,
      datasets: [
        {
          data: Data,
          backgroundColor: ["rgba(33, 89, 173, 0.38)"],
          borderColor: ["rgba(33, 89, 173, 1)"],
          barThickness: 40,
          borderWidth: 0.5,
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

export default BarGraphGray;
