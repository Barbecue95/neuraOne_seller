import { CreateProductPayload, ProductSortOption } from "@/types/product.types";
import axios from "axios";

const productInstance = axios.create({
  baseURL: "http://localhost:3000/api/products",
  headers: {
    "Content-Type": "application/json",
  },
});

export default productInstance;

export type GetProductsParams = {
  sort?: ProductSortOption;
  page?: number;
  limit?: number;
  searchText?: string;
};

export const createProduct = async (payload: CreateProductPayload) => {
  const res = await productInstance.post("/", payload);
  return res.data;
};

export const updateProduct = async ({
  payload,
  id,
}: {
  payload: CreateProductPayload;
  id: number;
}) => {
  const res = await productInstance.put("/", { ...payload, productId: id });
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
  const url = query ? `/?${query}` : "/";

  const res = await productInstance.get(url);
  return res.data;
};

export const getProductById = async (id: number) => {
  const res = await productInstance.get(`/${id}`);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await productInstance.delete(`/${id}`);
  return res.data;
};
