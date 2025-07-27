import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export enum OrderStatus {
  PENDING = "Pending",
  PROCESSING = "Processing",
  PACKAGING = "Packaging",
  DELIVERING = "Delivering",
  DELIVERED = "Delivered",
}

const statusMap: Record<OrderStatus, { label: string; className: string }> = {
  [OrderStatus.PENDING]: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  },
  [OrderStatus.PROCESSING]: {
    label: "Processing",
    className: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  },
  [OrderStatus.PACKAGING]: {
    label: "Packaging",
    className: "bg-purple-100 text-purple-700 hover:bg-purple-100",
  },
  [OrderStatus.DELIVERING]: {
    label: "Delivering",
    className: "bg-orange-100 text-orange-700 hover:bg-orange-100",
  },
  [OrderStatus.DELIVERED]: {
    label: "Delivered",
    className: "bg-green-100 text-green-700 hover:bg-green-100",
  },
};

type Props = {
  status: OrderStatus;
};

const OrderStatusBadge = ({ status }: Props) => {
  const { label, className } = statusMap[status];
  return (
    <Badge className={cn("px-3 py-1 text-sm font-medium", className)}>
      {label}
    </Badge>
  );
};

export default OrderStatusBadge;
