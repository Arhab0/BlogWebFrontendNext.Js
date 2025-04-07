import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});
// import { barGraphOptions } from "@/app/(AuthPages)/Signup/interfaces";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ChartOptions,
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

const barGraphOptions = (borderColors: string[]): ChartOptions<"bar"> => ({
  scales: {
    x: {
      grid: {
        drawOnChartArea: false,
        drawTicks: false,
      },
      ticks: {
        font: {
          size: 8,
        },
        color: "white", // Set x-axis tick color to white
      },
    },
    y: {
      grid: {
        drawOnChartArea: false,
        drawTicks: false,
      },
      ticks: {
        font: {
          size: 8,
        },
        color: "white", // Set y-axis tick color to white
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    datalabels: {
      color: (context: any) => borderColors[context.dataIndex] || "white", // Use borderColors for text color
      anchor: "center",
      align: "center" as "center", // Explicitly cast align
      font: {
        size: 10,
        weight: "bold",
      },
      formatter: (value: number) => value, // Show the value inside the bar
    },
  },
});

const BarGraphBlueAndGreen = ({ Label, Data }: Props) => {
  const [barData, setBarData] = useState({
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        categoryPercentage: 0.8, // notice here
        barPercentage: 0.8,
        backgroundColor: ["rgba(9, 245, 87, 0.35)", "rgba(24, 24, 24, 0.35)"],
        borderColor: ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)"],
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
          categoryPercentage: 0.8, // notice here
        barPercentage: 0.8,
          backgroundColor: ["rgba(9, 245, 87, 0.35)", "rgba(24, 24, 24, 0.35)"],
          borderColor: ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)"],
          barThickness: 40,
          borderWidth: 1,
        },
      ],
    });
  }, [Label,Data]);
  return (
    <div className="flex-1">
      <Bar className="bar-chart" data={barData} options={barGraphOptions([])} />
    </div>
  );
};

export default BarGraphBlueAndGreen;
