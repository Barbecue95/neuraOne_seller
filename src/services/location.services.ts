import axiosClient from "./axiosClient";
import { locationEndpoints } from "./constants/apiEndpoints";

export const getRegions = async () => {
  const res = await axiosClient.get(`${locationEndpoints.regions}`);
  return res.data;
};
export const getCities = async (id: string) => {
  const res = await axiosClient.get(`${locationEndpoints.cities}/${id}`);
  return res.data;
};
export const getTownships = async (id: string) => {
  const res = await axiosClient.get(`${locationEndpoints.townships}/${id}`);
  return res.data;
};