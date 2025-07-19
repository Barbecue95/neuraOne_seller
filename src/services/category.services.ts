import { getCategoriesResponse } from "@/types/product.types";
import axiosClient from "./axiosClient";
import { categoryEndpoints } from "./constants/apiEndpoints";

export const getCategories = async (): Promise<getCategoriesResponse> => {
  const res = await axiosClient.get(categoryEndpoints.categories);
  return res.data;
};
