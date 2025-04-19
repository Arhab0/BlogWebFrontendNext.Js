import React from "react";

interface DashboardCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: "blue" | "green" | "red" | "yellow" | "orange";
}

const DashboardCard = ({ title, value, icon, color }: DashboardCardProps) => {
  const bgColor = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    yellow: "bg-yellow-100 text-yellow-700",
    orange: "bg-orange-100 text-orange-700",
  };

  const iconColor = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    orange: "bg-orange-500",
  };

  return (
    <div className={`p-5 rounded-xl shadow-md ${bgColor[color]}`}>
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${iconColor[color]}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
