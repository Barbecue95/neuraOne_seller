"use client";
import { z } from "zod/v4";
import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";
import { DeleteIcon, EditIcon, EyeIcon } from "lucide-react";

export const categoryColumnsSchema = z.array(
  z.object({
    categoryName: z.string(),
    product: z.string(),
    status: z.enum(["Active", "Inactive", "Archived"]),
  }),
);
const columnHelper =
  createColumnHelper<z.infer<typeof categoryColumnsSchema>>();
export const categoryColumns = [
  columnHelper.accessor("categoryName", {
    header: "Category Name",
  }),

  columnHelper.accessor("product", {
    header: "Product",
  }),
  columnHelper.accessor("status", {
    header: "Status",
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
