"use client";
import { z } from "zod";
import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { transactionColumnsSchema } from "../paymentSchema";

const columnHelper =
  createColumnHelper<z.infer<typeof transactionColumnsSchema>>();

export const transactionColumns = [
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
    header: "Transaction ID",
  }),
  columnHelper.accessor("orderId", {
    header: "Order ID",
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
  }),
  columnHelper.accessor("method", {
    header: "Payment Type",
  }),
  columnHelper.accessor("status", {
    header: "Status",
  }),
  columnHelper.accessor("date", {
    header: "Transaction Date",
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
];
