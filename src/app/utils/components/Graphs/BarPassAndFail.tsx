import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Register plugin
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

const BarPassAndFail = ({ Label, Data }: Props) => {
  const [barData, setBarData] = useState({
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        categoryPercentage: 0.8, // Reduce spacing between categories (default is 0.8 or 1.0)
        barPercentage: 0.8,
        backgroundColor: [] as string[],
        borderColor: [] as string[],
        barThickness: 70,
        borderWidth: 0.5,
      },
    ],
  });

  const [borderColors, setBorderColors] = useState<string[]>([]);

  useEffect(() => {
    const generatedBackgroundColors = Data.map((_, index) =>
      index % 2 === 0 ? "rgba(19, 136, 58, 0.23)" : "rgba(249, 59, 59, 0.2)"
    );
    const generatedBorderColors = Data.map((_, index) =>
      index % 2 === 0 ? "rgba(19, 136, 58, 1)" : "rgba(249, 59, 59, 1)"
    );

    setBarData({
      labels: Label,
      datasets: [
        {
          data: Data,
          categoryPercentage: 0.8, // Reduce spacing between categories (default is 0.8 or 1.0)
          barPercentage: 0.8,
          backgroundColor: generatedBackgroundColors,
          borderColor: generatedBorderColors,
          barThickness: 70,
          borderWidth: 0.5,
        },
      ],
    });

    setBorderColors(generatedBorderColors);
  }, [Label, Data]);

  return (
    <div className="flex-1 h-full">
      <Bar
        className="bar-chart"
        data={barData}
        options={barGraphOptions(borderColors)} // Pass borderColors to options
      />
    </div>
  );
};

export default BarPassAndFail;
