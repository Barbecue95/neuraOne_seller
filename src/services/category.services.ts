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
import axiosClient from "./axiosClient";
import { categoryEndpoints } from "./constants/apiEndpoints";

export const getCategories = async ({
  sort,
  searchText,
  page,
  limit,
}: {
  sort?: ProductSortOption;
  searchText?: string;
  page?: number;
  limit?: number;
}): Promise<getCategoriesResponse> => {
  const params = Object.fromEntries(
    Object.entries({ sort, searchText, page, limit }).filter(
      ([_, value]) => value !== undefined,
    ),
  );

  const res = await axiosClient.get(categoryEndpoints.categories, {
    params,
  });
  return res.data;
};

export const createCategory = async (
  data: CategoryFormType,
): Promise<CreateCategoryResponse> => {
  const res = await axiosClient.post(categoryEndpoints.categories, {
    ...data,
    parentId: null,
  });
  return res.data;
};

export const updateCategory = async (
  data: CategoryType,
): Promise<CreateCategoryResponse> => {
  const res = await axiosClient.put(categoryEndpoints.categories, data);
  return res.data;
};

export const createVariants = async (
  data: VariantOptionPayloadType,
): Promise<VariantOptionResponseType> => {
  const res = await axiosClient.post(categoryEndpoints.createVariants, data);
  return res.data;
};

export const updateVariants = async (
  data: VariantOptionType,
): Promise<VariantOptionCreateResponse> => {
  const res = await axiosClient.put(categoryEndpoints.updateVariants, data);
  return res.data;
};

export const deleteCategory = async (
  id: number,
): Promise<CreateCategoryResponse> => {
  const res = await axiosClient.delete(`${categoryEndpoints.categories}/${id}`);
  return res.data;
};
