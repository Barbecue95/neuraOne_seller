"use client";
import { z } from "zod/v4";
import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";
import { DeleteIcon, EditIcon, EyeIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
  columnHelper.accessor("id", {
    header: "Order ID",
    cell: ({ row }) => (
      <div className="px-4 font-medium">#{row.getValue("id")}</div>
    ),
  }),
  columnHelper.accessor("customerName", {
    header: "Customer Name",
  }),
  // TODO: add total amount
  columnHelper.accessor("status", {
    header: "Total Amount",
    cell: (info) => {
      return <div>300,000 Ks</div>;
    },
  }),
  columnHelper.accessor("orderStatus", {
    header: "Order Status",
    cell: ({ row }) => {
      return (
        <div className="px-4">
          <h2
            className={cn(
              "w-fit rounded-full bg-[#FFFAA3] px-4 py-1 text-sm text-[#827C00]",
              {
                "bg-[#E4FFDF] text-[#126D00]":
                  row.getValue("orderStatus") === "Delivered",
              },
            )}
          >
            {row.getValue("orderStatus")}
          </h2>
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      return (
        <Link href={`/orders/${row.id}`} className="text-primary">
          View More
        </Link>
      );
    },
  }),
];
