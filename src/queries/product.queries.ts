import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductListing,
  GetProductsParams,
  updateProduct,
} from "@/services/product.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateProductPayload,
  EditProductPayload,
} from "@/components/Products/CreateProduct/ProductForm/product-form-schema";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateProductPayload) => createProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-listing"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      payload,
      id,
    }: {
      payload: EditProductPayload;
      id: number;
    }) => updateProduct({ payload, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-listing"] });
    },
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-listing"] });
    },
  });
};
