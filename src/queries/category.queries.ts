import { getCategories } from "@/services/category.services";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["Categories"],
    queryFn: () => getCategories(),
  });
};
