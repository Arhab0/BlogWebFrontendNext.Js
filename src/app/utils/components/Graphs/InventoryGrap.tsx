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
  ChartDataLabels
);

interface Props {
  Label: string[];
  Data: any[];
  FirstColor: string;
  SecondColor: string;
}

const barGraphOptions = (FirstColor: string, SecondColor: string): ChartOptions<"bar"> => ({
    scales: {
      x: {
        grid: {
          display: false, // Remove X-axis grid lines
        },
        ticks: {
          display: true, // Show X-axis labels
          font: {
            size:10, // Font size for labels
          },
          color: "#000", // Label color
        },
      },
      y: {
        grid: {
          display: false, // Remove Y-axis grid lines
        },
        ticks: {
          display: false, // Hide Y-axis labels
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 25, // Add extra space above the chart for labels
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      title: {
        display: false, // Hide title
      },
      datalabels: {
        color: (context: any) =>
          context.dataIndex % 2 === 0 ? FirstColor : SecondColor, // Use dynamic colors for text
        anchor: "end", // Position at the top of the bar
        align: "end", // Align text above the bar
        font: {
          size: 12,
        },
        formatter: (value: number) => `${value}%`, // Add % symbol to the value
        clamp: true, // Ensure labels stay within the chart bounds
        padding: {
          top: 0, // Add space above the label
        },
      },
    },
  });
  

const InventoryGraph = ({ Label, Data, FirstColor, SecondColor }: Props) => {
  const [barData, setBarData] = useState({
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        categoryPercentage: 0.8, // Adjust bar spacing
        barPercentage: 0.7,
        backgroundColor: [] as string[],
        borderColor: [] as string[],
        borderRadius: 8, // Rounded corners for bars
        borderWidth: 1, // Thin border around bars
      },
    ],
  });

  useEffect(() => {
    const generatedBackgroundColors = Data.map((_, index) =>
      index % 2 === 0 ? FirstColor : SecondColor
    );
    const generatedBorderColors = Data.map((_, index) =>
      index % 2 === 0 ? FirstColor : SecondColor
    );

    setBarData({
      labels: Label,
      datasets: [
        {
          data: Data,
          categoryPercentage: 0.8,
          barPercentage: 0.7,
          backgroundColor: generatedBackgroundColors,
          borderColor: generatedBorderColors,
          borderRadius: 8, // Rounded edges for bars
          borderWidth: 1,
        },
      ],
    });
  }, [Label, Data, FirstColor, SecondColor]);

  return (
    <div className="flex-1 h-full">
      <Bar
        className="bar-chart"
        data={barData}
        options={barGraphOptions(FirstColor, SecondColor)}
      />
    </div>
  );
};

export default InventoryGraph;
