import { ProductSortOption } from "@/types/product.types";
import { CreateProductPayload, EditProductPayload } from "@/components/Products/CreateProduct/ProductForm/product-form-schema";
import axiosClient from "./axiosClient";
import { productEndpoints } from "./constants/apiEndpoints";

export type GetProductsParams = {
  sort?: ProductSortOption;
  page?: number;
  limit?: number;
  searchText?: string;
};

export const createProduct = async (payload: CreateProductPayload) => {
  const res = await axiosClient.post(productEndpoints.products, payload);
  return res.data;
};

export const updateProduct = async ({
  payload,
  id,
}: {
  payload: EditProductPayload;
  id: number;
}) => {
  const res = await axiosClient.put(productEndpoints.products, { ...payload, productId: id });
  return res.data;
};

export const getProductListing = async (params?: GetProductsParams) => {
  const queryParams = new URLSearchParams();

  if (params?.sort) {
    queryParams.append("sortBy", params.sort);
  }
  if (params?.page) {
    queryParams.append("page", params.page.toString());
  }
  if (params?.limit) {
    queryParams.append("limit", params.limit.toString());
  }
  if (params?.searchText) {
    queryParams.append("searchText", params.searchText);
  }

  const query = queryParams.toString();
  const url = query ? `${productEndpoints.products}/?${query}` : productEndpoints.products;

  const res = await axiosClient.get(url);
  return res.data;
};

export const getProductById = async (id: number) => {
  const res = await axiosClient.get(`${productEndpoints.products}/${id}`);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await axiosClient.delete(`${productEndpoints.products}/${id}`);
  return res.data;
};
