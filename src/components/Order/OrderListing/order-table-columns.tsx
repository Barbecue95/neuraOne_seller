// src/components/OrderTable/order-table-columns.tsx
"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { SortableHeader } from "./sortable-header";
import { Order, OrderSortOption } from "@/types/order.types";
import OrderStatusBadge, {
  OrderStatus,
} from "../OrderDetail/order-status-badge";
import { formatCurrency } from "@/utils/numberFormat";

export const OrderTableColumns = (): ColumnDef<Order>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        aria-label="Select all"
        className="text-[#303030]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
        aria-label="Select row"
        className="text-[#303030]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: () => (
      <SortableHeader
        title="Order ID"
        sortOptions={[
          { label: "Newest", value: OrderSortOption.NEWEST },
          { label: "Oldest", value: OrderSortOption.OLDEST },
        ]}
      />
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    id: "customerName", // ← give it an explicit id
    accessorFn: (row) => row.user.name,
    header: () => (
      <SortableHeader
        title="Customer Name"
        sortOptions={[
          { label: "A → Z", value: OrderSortOption.NAME_ASC },
          { label: "Z → A", value: OrderSortOption.NAME_DESC },
        ]}
      />
    ),
    cell: ({ getValue }) => (
      <div className="font-medium">{getValue<string>()}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <SortableHeader
        title="Order Date"
        sortOptions={[
          { label: "Old → New", value: OrderSortOption.DATE_ASC },
          { label: "New → Old", value: OrderSortOption.DATE_DESC },
        ]}
      />
    ),
    cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
  },
  {
    accessorKey: "totalAmount",
    header: () => (
      <SortableHeader
        title="Total Amount"
        sortOptions={[
          {
            label: "Asc",
            value: OrderSortOption.TOTAL_AMOUNT_ASC,
          },
          {
            label: "Desc",
            value: OrderSortOption.TOTAL_AMOUNT_DESC,
          },
        ]}
      />
    ),
    cell: ({ row }) => {
      const amt = parseFloat(row.getValue("totalAmount"));
      return <div>{formatCurrency(amt)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <SortableHeader title="Status" sortOptions={[]} />,
    cell: ({ getValue }) => {
      const status = getValue() as OrderStatus;
      return <OrderStatusBadge status={status} />;
    },
  },
];
