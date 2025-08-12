import { OrderStatus } from "@/components/Order/OrderDetail/order-status-badge";
import {
  useGetOrderDetail,
  useUpdateOrder,
  useUpdateOrderStatus,
} from "@/queries/order.queries";
import { UpdateOrderPayload } from "@/types/order.types";
import { useParams } from "next/navigation";

export default function useOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: orderDetail, isLoading: isOrderDetailLoading } =
    useGetOrderDetail(id);
  const { mutate: updateOrder, isLoading: isOrderUpdateLoading } =
    useUpdateOrder(id);
  const { mutate: updateOrderStatus } = useUpdateOrderStatus(Number(id));
  const handleOrderUpdate: (
    data: UpdateOrderPayload,
    onSuccess?: () => void
  ) => void = (data, onSuccess) => {
    if (!orderDetail?.data) return;

    updateOrder(
      {
        address: data?.address ?? orderDetail?.data.address,
        notes: data?.notes ?? orderDetail?.data.notes,
        items: data.items ?? undefined,
      },
      { onSuccess: onSuccess }
    );
  };

  const handleReject = () => {
    updateOrderStatus(OrderStatus.REJECTED);
  };

  const handleAccept = () => {
    updateOrderStatus(OrderStatus.PROCESSING);
  };
  return {
    orderDetail,
    isOrderDetailLoading,
    isOrderUpdateLoading,
    handleAccept,
    handleReject,
    handleOrderUpdate,
  };
}
