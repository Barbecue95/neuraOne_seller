"use client";
import { z } from "zod/v4";
import { createColumnHelper } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DeleteIcon, EditIcon, EyeIcon } from "lucide-react";

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
      return (
        <Input className="size-6" type="checkbox" name="id" id="id_select" />
      );
    },
    cell: ({ row }) => {
      return (
        <Input className="size-5" type="checkbox" name={row.id} id={row.id} />
      );
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
    cell: () => {
      return (
        <div className="flex flex-row gap-2">
          <Button
            variant="default"
            className="rounded-full"
            size="icon"
            onClick={() => {}}
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
