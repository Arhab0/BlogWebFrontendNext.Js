import React from "react";

interface DashboardCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: "blue" | "green" | "red" | "yellow" | "orange";
  isLoading?: boolean;
}

const DashboardCard = ({ title, value, icon, color, isLoading = false}: DashboardCardProps) => {
  const colorMap = {
    blue: {
      bg: "bg-blue-50",
      iconBg: "bg-blue-500",
      text: "text-blue-700",
    },
    green: {
      bg: "bg-green-50",
      iconBg: "bg-green-500",
      text: "text-green-700",
    },
    red: {
      bg: "bg-red-50",
      iconBg: "bg-red-500",
      text: "text-red-700",
    },
    yellow: {
      bg: "bg-yellow-50",
      iconBg: "bg-yellow-500",
      text: "text-yellow-700",
    },
    orange: {
      bg: "bg-orange-50",
      iconBg: "bg-orange-500",
      text: "text-orange-700",
    },
  };

  const selectedColor = colorMap[color];

  return (
    <div className={`p-5 rounded-2xl border-l-4 ${selectedColor.bg} border-l-${color} h-full transition-all duration-300 hover:shadow-lg`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${selectedColor.iconBg} shadow-sm`}>
          {icon}
        </div>
      </div>
      
      <div className="mt-2">
        <p className="text-xs font-medium text-slate-500 mb-1">{title}</p>
        {isLoading ? (
          <div className="h-8 w-16 bg-slate-200 animate-pulse rounded-md"></div>
        ) : (
          <p className={`text-3xl font-bold ${selectedColor.text}`}>{value.toLocaleString()}</p>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;