import {
  createCategory,
  getCategories,
  updateCategory,
  createVariants,
  updateVariants,
  deleteCategory,
} from "@/services/category.services";
import {
  CategoryFormType,
  CategoryType,
  CreateCategoryResponse,
  getCategoriesResponse,
  ProductSortOption,
  VariantOptionCreateFormType,
  VariantOptionCreateResponse,
  VariantOptionPayloadType,
  VariantOptionResponseType,
  VariantOptionType,
} from "@/types/product.types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCategories = ({
  sort,
  searchText,
  page,
  limit,
}: {
  sort?: ProductSortOption;
  searchText?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery<getCategoriesResponse, Error>({
    queryKey: ["Categories"],
    queryFn: () => getCategories({ sort, searchText, page, limit }),
  });
};

export const useCreateCategory = () => {
  return useMutation<CreateCategoryResponse, Error, CategoryFormType>({
    mutationKey: ["Create-Category"],
    mutationFn: (data: CategoryFormType) => createCategory(data),
  });
};

export const useCreateVariants = () => {
  return useMutation<
    VariantOptionResponseType,
    Error,
    VariantOptionPayloadType
  >({
    mutationKey: ["Create-Variants"],
    mutationFn: (data: VariantOptionPayloadType) => createVariants(data),
  });
};

export const useUpdateVariants = () => {
  return useMutation<VariantOptionCreateResponse, Error, VariantOptionType>({
    mutationKey: ["Update-Variants"],
    mutationFn: (data: VariantOptionType) => updateVariants(data),
  });
};

export const useUpdateCategory = () => {
  return useMutation<CreateCategoryResponse, Error, CategoryType>({
    mutationKey: ["Update-Category"],
    mutationFn: (data: CategoryType) => updateCategory(data),
  });
};

export const useDeleteCategory = () => {
  return useMutation<CreateCategoryResponse, Error, number>({
    mutationKey: ["Delete-Category"],
    mutationFn: (id: number) => deleteCategory(id),
  });
};
