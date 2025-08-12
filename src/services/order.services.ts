import {
  OrderApiResponse,
  OrderSortOption,
  UpdateOrderPayload,
} from "@/types/order.types";
import axiosClient from "./axiosClient";
import { orderEndpoints } from "./constants/apiEndpoints";
import { OrderStatus } from "@/components/Order/OrderDetail/order-status-badge";

export const getOrderListing = async (params: {
  sort?: OrderSortOption;
  page?: number;
  limit?: number;
  searchText?: string;
}) => {
  const qp = new URLSearchParams();

  if (params?.sort) qp.append("sortBy", params.sort);
  if (params?.page) qp.append("page", params.page.toString());
  if (params?.limit) qp.append("limit", params.limit.toString());
  if (params?.searchText) qp.append("searchText", params.searchText);

  const query = qp.toString();
  const url = query
    ? `${orderEndpoints.orders}?${query}`
    : orderEndpoints.orders;

  const res = await axiosClient.get(url);
  return res.data;
};

export const getOrderDetail = async (id: string): Promise<OrderApiResponse> => {
  const url = `${orderEndpoints.orders}/${id}`;
  const res = await axiosClient.get(url);
  return res.data;
};

export const updateOrderStatus = async (
  id: number,
  status: OrderStatus
): Promise<any> => {
  const url = `${orderEndpoints.status}`;
  const res = await axiosClient.patch(url, { id, status });
  return res.data;
};

export const updateOrder = async (
  id: string,
  data: UpdateOrderPayload
): Promise<any> => {
  const url = `${orderEndpoints.orders}/${id}`;
  const res = await axiosClient.put(url, { data: data });
  return res.data;
};
