import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});
import { barGraphOptions } from "@/app/(AuthPages)/Signup/interfaces";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Import chartjs-plugin-datalabels
import "chartjs-plugin-datalabels";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Ensure it's imported correctly

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Register plugin
);

interface Props {
  Data: number[];
  Data2: number[]; // Add a second dataset for the multi-line chart
}

const MultiLineChart = ({ Data, Data2 }: Props) => {
  const [lineData, setLineData] = useState({
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        data: [] as number[],
        label: "Result", // First dataset label
        backgroundColor: "rgba(19, 136, 58, 0.5)", // Green color for the line
        borderColor: "rgba(19, 136, 58, 1)", // Green border color for the line
        fill: false,
        pointRadius: 0,
        borderWidth: 2,
        tension: 0.4,
      },
      {
        data: [] as number[],
        label: "Result", // Second dataset label
        backgroundColor: "rgba(249, 59, 59, 0.5)", // Red color for the line
        borderColor: "rgba(249, 59, 59, 1)", // Red border color for the line
        fill: false,
        pointRadius: 0,
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    setLineData({
      ...lineData,
      datasets: [
        {
          data: Data,
          label: "Pass Data",
          backgroundColor: "rgba(19, 136, 58, 0.5)",
          borderColor: "rgba(19, 136, 58, 1)",
          fill: false,
          pointRadius: 0,
        borderWidth: 2,
        tension: 0.4,
        },
        {
          data: Data2, // Second dataset for fail data
          label: "Fail Data",
          backgroundColor: "rgba(249, 59, 59, 0.5)",
          borderColor: "rgba(249, 59, 59, 1)",
          fill: false,
          pointRadius: 0,
        borderWidth: 2,
        tension: 0.4,
        },
      ],
    });
  }, [Data, Data2]);

  const lineChartOptions = {
    ...barGraphOptions,
    plugins: {
      ...barGraphOptions.plugins,
      datalabels: {
        display: true,
        align: "top",
        anchor: "center",
        font: {
          size: 12,
        },
        formatter: (value: any) => value,
        color: "white",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex-1" style={{flex:1}}>
      <Line className="line-chart" data={lineData} options={lineChartOptions} />
    </div>
  );
};

export default MultiLineChart;
