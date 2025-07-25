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
  CreateCategoryResponse,
  getCategoriesResponse,
  ProductSortOption,
  UpdateCategoryType,
  VariantOptionPayloadType,
  VariantOptionResponseType,
  VariantOptionType,
} from "@/types/product.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    queryKey: ["Categories", page, limit, sort, searchText],
    queryFn: () => getCategories({ sort, searchText, page, limit }),
  });
};

export const useCreateCategory = () => {
  const qr = useQueryClient();
  return useMutation<CreateCategoryResponse, Error, CategoryFormType>({
    mutationKey: ["Create-Category"],
    mutationFn: (data: CategoryFormType) => createCategory(data),
    onSuccess() {
      qr.invalidateQueries(["Categories"]);
    },
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
  return useMutation<VariantOptionResponseType, Error, VariantOptionType>({
    mutationKey: ["Update-Variants"],
    mutationFn: (data: VariantOptionType) => updateVariants(data),
  });
};

export const useUpdateCategory = () => {
  const qr = useQueryClient();
  return useMutation<CreateCategoryResponse, Error, UpdateCategoryType>({
    mutationKey: ["Update-Category"],
    mutationFn: (data) => updateCategory(data),
    onSuccess() {
      qr.invalidateQueries(["Categories"]);
    },
  });
};

export const useDeleteCategory = () => {
  const qr = useQueryClient();
  return useMutation<CreateCategoryResponse, Error, number>({
    mutationKey: ["Delete-Category"],
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess() {
      qr.invalidateQueries(["Categories"]);
    },
  });
};