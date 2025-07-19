import {
  useQuery,
  UseQueryResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  deleteProducts,
  getProductById,
  getProductListing,
  updateProduct,
} from "@/services/product.services";
import {
  CreateProductPayload,
  EditProductPayload,
} from "@/components/Products/CreateProduct/ProductForm/product-form-schema";
import {
  GetProductsParams,
  GetProductsResponse,
  Product,
} from "@/types/product.types";

export const useGetProductListing = (
  params?: GetProductsParams,
): UseQueryResult<GetProductsResponse, Error> =>
  useQuery<GetProductsResponse, Error>({
    queryKey: ["product-listing", params],
    queryFn: () => getProductListing(params),
    keepPreviousData: true,
  });

export const useGetProductById = (id: number): UseQueryResult<any, Error> =>
  useQuery<any, Error>({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<Product, Error, CreateProductPayload>({
    mutationFn: (payload) => createProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["product-listing"]);
      // e.g. invalidate ["product-listing"]
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Product,
    Error,
    { id: number; payload: EditProductPayload }
  >({
    mutationFn: ({ id, payload }) => updateProduct({ id, payload }),
    onSuccess: (product) => {
      queryClient.invalidateQueries(["product-listing", "product", product.id]);
      // e.g. invalidate ["product-listing"] or ["product", id]
    },
  });
};

export const useDeleteProduct = () =>
  useMutation<void, Error, number>({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      // e.g. invalidate ["product-listing"]
    },
  });

export const useDeleteProducts = () =>
  useMutation<void, Error, number[]>({
    mutationFn: (ids) => deleteProducts(ids),
    onSuccess: () => {
      // e.g. invalidate ["product-listing"]
    },
  });
