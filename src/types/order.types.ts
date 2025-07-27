import { OrderStatus } from "@/components/Order/OrderDetail/order-status-badge";

export type Order = {
  orderId: string;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  quantity: number;
  orderStatus: OrderStatus;
};

export type OrderColumnDef = {
  id: number;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  quantity: number | null;
  status: string;
};

export enum OrderSortPeriodOption {
  TODAY = "today",
  YESTERDAY = "yesterday",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
}

export enum OrderSortOption {
  NAME_ASC = "nameAsc",
  NAME_DESC = "nameDesc",
  DATE_ASC = "dateAsc",
  DATE_DESC = "dateDesc",
  TOTAL_AMOUNT_ASC = "totalAsc",
  TOTAL_AMOUNT_DESC = "totalDesc",
  QUANTITY_ASC = "qtyAsc",
  QUANTITY_DESC = "qtyDesc",
  NEWEST = "newest",
  OLDEST = "oldest",
}
