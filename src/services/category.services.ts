import axiosClient from "./axiosClient";
import { categoryEndpoints } from "./constants/apiEndpoints";

export const getCategories = async () => {
  const res = await axiosClient.get(categoryEndpoints.categories);
  return res.data;
};