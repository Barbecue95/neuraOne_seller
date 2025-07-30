"use client";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useQueryParams } from "@/hooks/use-query-params";
import { formatNumber } from "@/utils/numberFormat";
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartDataByDay = [
  { day: "Mon", sales: 300000, orders: 200 },
  { day: "Tue", sales: 200000, orders: 300 },
  { day: "Wed", sales: 230000, orders: 400 },
  { day: "Thu", sales: 340000, orders: 500 },
  { day: "Fri", sales: 520000, orders: 600 },
  { day: "Sat", sales: 600000, orders: 700 },
  { day: "Sun", sales: 700000, orders: 800 },
];

const chartDataByMonth = [
  { month: "Jan", sales: 1000000, orders: 200 },
  { month: "Feb", sales: 800000, orders: 300 },
  { month: "Mar", sales: 900000, orders: 400 },
  { month: "Apr", sales: 700000, orders: 500 },
  { month: "May", sales: 520000, orders: 600 },
  { month: "Jun", sales: 600000, orders: 700 },
  { month: "Jul", sales: 700000, orders: 800 },
  { month: "Aug", sales: 700000, orders: 800 },
  { month: "Sep", sales: 700000, orders: 800 },
  { month: "Oct", sales: 700000, orders: 800 },
  { month: "Nov", sales: 700000, orders: 800 },
  { month: "Dec", sales: 700000, orders: 800 },
];

const chartDataByTime = [
  { time: "12:00 AM", sales: 50000, orders: 200 },
  { time: "01:00 AM", sales: 20000, orders: 300 },
  { time: "02:00 AM", sales: 23000, orders: 400 },
  { time: "03:00 AM", sales: 34000, orders: 500 },
  { time: "04:00 AM", sales: 52000, orders: 600 },
  { time: "05:00 AM", sales: 90000, orders: 700 },
  { time: "06:00 AM", sales: 30000, orders: 800 },
  { time: "07:00 AM", sales: 20000, orders: 800 },
  { time: "08:00 AM", sales: 10000, orders: 800 },
  { time: "09:00 AM", sales: 30000, orders: 800 },
  { time: "10:00 AM", sales: 100000, orders: 800 },
  { time: "11:00 AM", sales: 40000, orders: 800 },
  { time: "12:00 PM", sales: 60000, orders: 800 },
];

const chartConfig = {
  sales: {
    label: "sales",
    color: "#2563eb",
  },
} satisfies ChartConfig;

// Custom rounded bar shape
const RoundedBar = (props: any) => {
  const { x, y, width, height } = props;
  const radius = Math.min(width / 2, 100);
  return (
    <path
      d={`
        M ${x},${y + height}
        L ${x},${y + radius}
        Q ${x},${y} ${x + radius},${y}
        L ${x + width - radius},${y}
        Q ${x + width},${y} ${x + width},${y + radius}
        L ${x + width},${y + height}
        Z
      `}
      fill="url(#customGradient)"
    />
  );
};

export default function DashboardChart() {
  const { getParam } = useQueryParams();
  const chartType = getParam("sortBy") || "month";

  // Dynamic chart data and configuration
  const getChartConfig = () => {
    switch (chartType) {
      case "month":
        return {
          data: chartDataByMonth,
          dataKey: "month",
          tickFormatter: (value: string) => value.slice(0, 3), // Jan, Feb, Mar
        };
      case "time":
        return {
          data: chartDataByTime,
          dataKey: "time",
          tickFormatter: (value: string) => {
            const [time, period] = value.split(" ");
            const hour = parseInt(time.split(":")[0], 10).toString();
            return `${hour} ${period}`;
          },
        };
      case "day":
      default:
        return {
          data: chartDataByDay,
          dataKey: "day",
          tickFormatter: (value: string) => value.slice(0, 3), // Mon, Tue, Wed
        };
    }
  };

  const { data, dataKey, tickFormatter } = getChartConfig();

  return (
    <div>
      <h2 className="px-8 pb-2 text-xl font-medium">Sales</h2>
      <ChartContainer config={chartConfig} className="min-h-[450px] w-fit">
        <BarChart accessibilityLayer data={data} barCategoryGap="10%">
          <defs>
            <linearGradient id="customGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="oklch(0.603 0.1986 274.3)"
                stopOpacity={1}
              />
              <stop offset="100%" stopColor="#e4e6ff" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={dataKey} // Dynamic dataKey
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={tickFormatter} // Dynamic tick formatter
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => formatNumber(value, 0)}
          />
          <Bar
            dataKey="sales"
            fill="url(#customGradient)"
            shape={<RoundedBar />}
            maxBarSize={20}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
