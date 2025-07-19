import { getCategories } from "@/services/category.services";
import { getCategoriesResponse } from "@/types/product.types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetCategories = () => {
  return useQuery<getCategoriesResponse, Error>({
    queryKey: ["Categories"],
    queryFn: getCategories,
  });
};
