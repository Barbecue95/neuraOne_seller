"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { SortableHeader } from "./sortable-header";
import { Order, OrderSortOption } from "@/types/order.types";
import OrderStatusBadge, {
  OrderStatus,
} from "../OrderDetail/order-status-badge";

export const OrderTableColumns = (): ColumnDef<Order>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="text-[#303030]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="text-[#303030]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "orderId",
      header: () => (
        <SortableHeader
          title="Order ID"
          sortOptions={[
            { label: "Newest", value: OrderSortOption.NEWEST },
            { label: "Oldest", value: OrderSortOption.OLDEST },
          ]}
        />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("orderId")}</div>
      ),
    },
    {
      accessorKey: "customerName",
      header: () => (
        <SortableHeader
          title="Customer Name"
          sortOptions={[
            { label: "Name (A → Z)", value: OrderSortOption.NAME_ASC },
            { label: "Name (Z → A)", value: OrderSortOption.NAME_DESC },
          ]}
        />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("customerName")}</div>
      ),
    },
    {
      accessorKey: "orderDate",
      header: () => (
        <SortableHeader
          title="Order Date"
          sortOptions={[
            { label: "Date (0 → 9)", value: OrderSortOption.DATE_ASC },
            { label: "Date (9 → 0)", value: OrderSortOption.DATE_DESC },
          ]}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("orderDate")}</div>,
    },
    {
      accessorKey: "totalAmount",
      header: () => (
        <SortableHeader
          title="Total Amount"
          sortOptions={[
            {
              label: "Amount (0 → 9)",
              value: OrderSortOption.TOTAL_AMOUNT_ASC,
            },
            {
              label: "Amount (9 → 0)",
              value: OrderSortOption.TOTAL_AMOUNT_DESC,
            },
          ]}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("totalAmount")}</div>,
    },
    {
      accessorKey: "quantity",
      header: () => (
        <SortableHeader
          title="Quantity"
          sortOptions={[
            {
              label: "Quantity (0 → 9)",
              value: OrderSortOption.QUANTITY_ASC,
            },
            {
              label: "Quantity (9 → 0)",
              value: OrderSortOption.QUANTITY_DESC,
            },
          ]}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
    },
    {
      accessorKey: "orderStatus",
      header: () => <SortableHeader title="Order Status" sortOptions={[]} />,
      cell: ({ getValue }) => {
        const status = getValue() as OrderStatus;

        return <OrderStatusBadge status={status} />;
      },
    },
  ];
};
