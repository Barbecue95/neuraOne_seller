"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQueryParams } from "@/hooks/use-query-params";
import { SalesItemType } from "@/types/dashboard.types";
import { formatNumber } from "@/utils/numberFormat";
import React from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

const chartConfig = {
  total: {
    label: "total",
    color: "#2563eb",
  },
} satisfies ChartConfig;

// Custom rounded bar shape (avoid drawing for zero/near-zero heights)
const RoundedBar = (props: any) => {
  const { x, y, width, height } = props;

  // Nothing to draw
  if (!width || !height || height <= 0) return null;

  // Clamp radius so it never exceeds half the width or the bar height.
  const radius = Math.min(width / 2, height, 100);

  // For very small heights draw a simple rect to avoid tiny semicircles.
  if (height <= 2) {
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={0}
        ry={0}
        fill="url(#customGradient)"
      />
    );
  }

  const path = [
    `M ${x},${y + height}`,
    `L ${x},${y + radius}`,
    `Q ${x},${y} ${x + radius},${y}`,
    `L ${x + width - radius},${y}`,
    `Q ${x + width},${y} ${x + width},${y + radius}`,
    `L ${x + width},${y + height}`,
    "Z",
  ].join(" ");

  return <path d={path} fill="url(#customGradient)" />;
};

export default function DashboardChart({ sales }: { sales: SalesItemType[] }) {
  const { getParam } = useQueryParams();
  const isMobile = useIsMobile();
  const chartType = getParam("sortBy") || "monthly";

  // Dynamic chart data and configuration
  const getChartConfig = () => {
    switch (chartType) {
      case "monthly":
        return {
          tickFormatter: (value: string) => value.slice(0, 3),
        };
      case "today":
        return {
          tickFormatter: (value: string) => value,
        };
      case "yesterday":
        return {
          tickFormatter: (value: string) => value,
        };
      case "weekly":
      default:
        return {
          tickFormatter: (value: string) => value.slice(0, 3),
        };
    }
  };

  const { tickFormatter } = getChartConfig();

  return (
    <div>
      <h2 className="px-8 pb-2 text-xl font-medium">Sales</h2>
      <ChartContainer
        config={chartConfig}
        className=" min-h-48 sm:min-h-52 md:min-h-80 w-fit lg:min-h-[450px]"
      >
        <BarChart accessibilityLayer data={sales} barCategoryGap="10%">
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
            dataKey={"label"}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={tickFormatter}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => formatNumber(value, 0)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="total"
            fill="url(#customGradient)"
            shape={<RoundedBar />}
            maxBarSize={isMobile ? 8 : 20}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
