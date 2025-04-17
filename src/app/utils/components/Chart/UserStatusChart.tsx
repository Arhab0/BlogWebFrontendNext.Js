import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const UserStatusChart = ({ data }: { data: any }) => {
  const chartData = [
    { name: "Active", value: data?.ActiveUsers || 0 },
    { name: "DeActivated Users", value: data?.DeActivatedUsers || 0 },
  ];

  const barColors = {
    Active: "#10b981",
    "DeActivated Users": "#ef4444",
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData} barCategoryGap={30}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip cursor={{ fill: "transparent" }} />
        <Bar
          dataKey="value"
          radius={[4, 4, 0, 0]}
          barSize={100}
          isAnimationActive={false}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={barColors[entry.name as keyof typeof barColors]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UserStatusChart;
