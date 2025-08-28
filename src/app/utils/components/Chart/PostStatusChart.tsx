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

const PostStatusChart = ({ data }: { data: any }) => {
  const chartData = [
    { name: "Active", value: data?.ActivePosts || 0 },
    { name: "Rejected", value: data?.RejectedPosts || 0 },
    { name: "Pending", value: data?.PendingPosts || 0 },
    { name: "ReSubmitted Posts", value: data?.ReSubmittedPosts || 0 },
  ];

  const barColors = {
    Active: "#10b981", // green
    Pending: "#f59e0b", // amber
    Rejected: "#ef4444", // red
    Resubmitted: "#f97316", // orange
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData} barCategoryGap={30}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tickFormatter={(value) =>
            value === "ReSubmitted Posts" ? "ReSubmitted" : value
          }
        />

        <YAxis allowDecimals={false} />
        <Tooltip cursor={{ fill: "transparent" }} />
        <Bar
          dataKey="value"
          radius={[4, 4, 0, 0]}
          barSize={60}
          isAnimationActive={false}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={barColors[entry.name as keyof typeof barColors]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PostStatusChart;
