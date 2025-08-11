import { getDashboard } from "@/services/dashboard.services";
import { DashboardResponse } from "@/types/dashboard.types";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboard = (chartType: string) => {
  return useQuery<DashboardResponse, Error>({
    queryKey: ["Dashboard", chartType],
    queryFn: () => getDashboard(chartType),
  });
};
