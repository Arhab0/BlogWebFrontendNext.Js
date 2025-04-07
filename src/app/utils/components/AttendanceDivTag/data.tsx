import { center } from "./type";

export const data = {
  labels: ["Attendance", "Copies Received"],
  datasets: [
    {
      label: "Percentage",
      data: [1800, 500],
      backgroundColor: ["rgba(33, 89, 173, 1)", "rgb(136,136,136)"],
      borderColor: ["rgba(33, 89, 173, 1)", "rgb(136,136,136)"],
      borderWidth: 1,
    },
  ],
};

export const dropdownValues: center[] = [
    {label: "Value 1", value: "Value 1"},
    {label: "Value 2", value: "Value 2"},
    {label: "Value 3", value: "Value 3"},
]