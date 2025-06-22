import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductListing,
  GetProductsParams,
  updateProduct,
} from "@/services/product.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateProductPayload, EditProductPayload } from "@/components/Products/CreateProduct/ProductForm/product-form-schema";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (payload: CreateProductPayload) => createProduct(payload),
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: ({
      payload,
      id,
    }: {
      payload: EditProductPayload;
      id: number;
    }) => updateProduct({payload, id}),
  });
};

export const useGetProductListing = (params?: GetProductsParams) => {
  return useQuery({
    queryKey: ["product-listing", params],
    queryFn: () => getProductListing(params),
  });
};

export const useGetProductById = (id: number) => {
  return useQuery({
    queryKey: ["product-listing", id],
    queryFn: () => getProductById(id),
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    mutationKey: ["product-listing"],
  });
};
