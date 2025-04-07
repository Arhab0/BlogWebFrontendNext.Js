import React, { useEffect, useState } from "react";
import { DivTagProps } from "./type";
import "react-calendar/dist/Calendar.css";
import dynamic from "next/dynamic";
import "chart.js/auto";
import Metrics from "../EvaluatorProfileComponents/EvaluatorMetrics";

const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});

interface Props {
  bgColor: string;
  percentage: number;
  primaryColor: string;
  secondarycolor: string;
  booked: number;
  parcelReceived: number;
  copyReceived: number;
}

function DivCopyTag({
  bgColor,
  primaryColor,
  percentage,
  secondarycolor,
  booked = 0,
  parcelReceived = 0,
  copyReceived = 0,
}: Props) {
  const options: any = {
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
          drawTicks: false,
        },
      },
      y: {
        grid: {
          drawOnChartArea: false,
          drawTicks: false,
        },
      },
    },
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
  const [data, setData] = useState({
    labels: ["Parcels Booked", "Parcels Received"],
    datasets: [
      {
        label: "Percentage",
        data: [0, 0],
        backgroundColor: ["rgba(33, 89, 173, 1)", "rgb(136,136,136)"],
        borderColor: ["rgba(33, 89, 173, 1)", "rgb(136,136,136)"],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    setData({
      labels: ["Parcels Booked", "Parcels Received"],
      datasets: [
        {
          label: "Percentage",
          data: [booked, parcelReceived],
          backgroundColor: ["rgba(33, 89, 173, 1)", "rgb(136,136,136)"],
          borderColor: ["rgba(33, 89, 173, 1)", "rgb(136,136,136)"],
          borderWidth: 1,
        },
      ],
    });
  }, [booked, parcelReceived]);

  return (
    <div className={`${bgColor} rounded-md my-3`}>
      <div
        className={`font-alata h-[90%] grid grid-cols-1 md:grid-cols-[70%_30%] flex-1 items-end justify-between space-x-5 ${primaryColor} px-7 py-4`}
      >
        <div className="md:grid grid-cols-1 md:grid-cols-3 gap-4">
          <Metrics heading="Parcels Booked" metric={booked} color="black" />
          <Metrics
            heading="Parcels Received"
            metric={parcelReceived}
            color="black"
          />
          <Metrics
            heading="Copies Received"
            metric={copyReceived}
            color="black"
          />
        </div>
        <div className="">
          <p className="text-4xl font-medium text-[#2159AD] text-right w-full">
            {percentage}%
          </p>
          <Bar className="bar-chart" data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default DivCopyTag;
