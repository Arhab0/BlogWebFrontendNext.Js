import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Pie = dynamic(() => import("react-chartjs-2").then((mod) => mod.Pie), {
  ssr: false,
});
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface Props {
  Label: string[];
  Data: number[];
}

const PieGraph = ({ Label, Data }: Props) => {
  const [pieData, setPieData] = useState({
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        backgroundColor: [
          "rgba(46, 85, 153, 1)", // Deep Blue
          "rgba(90, 110, 178, 1)", // Light Blue
          "rgba(67, 160, 71, 1)", // Green
          "rgba(255, 193, 7, 1)", // Yellow
          "rgba(233, 30, 99, 1)", // Pink
          "rgba(103, 58, 183, 1)", // Purple
          "rgba(0, 172, 193, 1)", // Cyan
          "rgba(156, 39, 176, 1)", // Bright Purple
          "rgba(255, 87, 34, 1)", // Orange
          "rgba(244, 67, 54, 1)", // Red
          "rgba(96, 125, 139, 1)", // Grey-Blue
          "rgba(205, 220, 57, 1)", // Lime Green
          "rgba(158, 158, 158, 1)", // Neutral Grey
          "rgba(0, 188, 212, 1)", // Aqua
          "rgba(255, 235, 59, 1)", // Bright Yellow
        ],

        borderColor: ["rgba(255, 255, 255, 1)"], // Optional border color for each slice
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    setPieData({
      labels: Label,
      datasets: [
        {
          data: Data,
          backgroundColor: [
            "rgba(46, 85, 153, 1)", // Deep Blue
            "rgba(90, 110, 178, 1)", // Light Blue
            "rgba(67, 160, 71, 1)", // Green
            "rgba(255, 193, 7, 1)", // Yellow
            "rgba(233, 30, 99, 1)", // Pink
            "rgba(103, 58, 183, 1)", // Purple
            "rgba(0, 172, 193, 1)", // Cyan
            "rgba(156, 39, 176, 1)", // Bright Purple
            "rgba(255, 87, 34, 1)", // Orange
            "rgba(244, 67, 54, 1)", // Red
            "rgba(96, 125, 139, 1)", // Grey-Blue
            "rgba(205, 220, 57, 1)", // Lime Green
            "rgba(158, 158, 158, 1)", // Neutral Grey
            "rgba(0, 188, 212, 1)", // Aqua
            "rgba(255, 235, 59, 1)", // Bright Yellow
          ],

          borderColor: ["rgba(255, 255, 255, 1)"],
          borderWidth: 2,
        },
      ],
    });
  }, [Label, Data]);

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Disables automatic aspect ratio
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const dataset = tooltipItem.dataset;
            const currentValue = dataset.data[tooltipItem.dataIndex];
            return `Value: ${currentValue}`;
          },
        },
      },
      datalabels: {
        color: "white", // Set value label color to black
        font: {
          size: 12,
        },
        formatter: (value: number) => value, // Format the displayed value
      },
    },
  };

  return (
    // <div className="flex-1" style={{height: "120px"}}>
    <Pie className="pie-chart" data={pieData} options={pieChartOptions} />
    // </div>
  );
};

export default PieGraph;
