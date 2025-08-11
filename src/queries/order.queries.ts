import { OrderStatus } from "@/components/Order/OrderDetail/order-status-badge";
import {
  getOrderDetail,
  getOrderListing,
  updateOrder,
  updateOrderStatus,
} from "@/services/order.services";
import {
  OrderApiResponse,
  OrderItemPayload,
  OrderListApiResponse,
  OrderSortOption,
  UpdateOrderPayload,
} from "@/types/order.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetOrderListing = (params: {
  sort?: OrderSortOption;
  page?: number;
  limit?: number;
  searchText?: string;
}) => {
  return useQuery<OrderListApiResponse, Error>({
    queryKey: ["Orders"],
    queryFn: () => getOrderListing(params),
  });
};
export const useGetOrderDetail = (id?: string) => {
  return useQuery<OrderApiResponse, Error>({
    queryKey: ["Order", id],
    enabled: !!id,
    queryFn: () => getOrderDetail(id as string),
  });
};

export const useUpdateOrderStatus = (id: number) => {
  const qr = useQueryClient();
  return useMutation<any, Error, OrderStatus>({
    mutationFn: (status) => updateOrderStatus(id, status),
    onSuccess: () => {
      qr.invalidateQueries(["Order", id]);
      qr.invalidateQueries(["Orders"]);
    },
  });
};

export const useUpdateOrder = (id: string) => {
  const qr = useQueryClient();
  return useMutation<any, Error, UpdateOrderPayload>({
    mutationFn: (data) => updateOrder(id, data),
    onSuccess: () => {
      qr.invalidateQueries(["Order", id]);
      qr.invalidateQueries(["Orders"]);
    },
  });
};
