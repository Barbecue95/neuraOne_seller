"use client";
import { z } from "zod/v4";
import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";
import { DeleteIcon, EditIcon, EyeIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export const orderColumnsSchema = z.array(
  z.object({
    id: z.number(),
    customerName: z.string(),
    orderDate: z.date(),
    method: z.string(),
    status: z.string(),
    orderStatus: z.string(),
  }),
);
const columnHelper = createColumnHelper<z.infer<typeof orderColumnsSchema>>();
export const orderColumns = [
  columnHelper.display({
    id: "id_select",
    header: () => {
      return <Checkbox />;
    },
    cell: ({ row }) => {
      return <Checkbox name={row.id} id={row.id} />;
    },
  }),
  columnHelper.accessor("id", {
    header: "Order ID",
  }),
  columnHelper.accessor("customerName", {
    header: "Customer Name",
  }),
  columnHelper.accessor("orderDate", {
    header: "Order Date",
    cell: (info) => {
      const date = info.getValue() as Date;
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  }),
  columnHelper.accessor("method", {
    header: "Payment",
  }),
  columnHelper.accessor("status", {
    header: "Status",
  }),
  columnHelper.accessor("orderStatus", {
    header: "Order Status",
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-2">
          <Button
            variant="default"
            className="rounded-full"
            size="icon"
            onClick={() => {
              window.location.href = `/orders/${row.id}`;
            }}
          >
            <EyeIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            className="rounded-full"
            size="icon"
            onClick={() => {}}
          >
            <EditIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            className="rounded-full"
            size="icon"
            onClick={() => {}}
          >
            <DeleteIcon className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  }),
];
