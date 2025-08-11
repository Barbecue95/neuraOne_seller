"use client";
import { useQueryParams } from "@/hooks/use-query-params";
import { useGetDashboard } from "@/queries/dashboard.queries";

export default function useDashboard() {
  const { getParam } = useQueryParams();
  const chartType = getParam("sortBy") || "monthly";
  const { data: dashboardData, isLoading: isDashboardLoading } =
    useGetDashboard(chartType);

  return { dashboardData, isDashboardLoading };
}
