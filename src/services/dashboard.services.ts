import axiosClient from "./axiosClient";
import { dashboardEndpoints } from "./constants/apiEndpoints";

export const getDashboard = async (chartType: string) => {
  const res = await axiosClient.get(dashboardEndpoints.dashboard, {
    params: {
      sales: chartType,
    },
  });
  return res.data;
};
