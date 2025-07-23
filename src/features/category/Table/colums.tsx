"use client";
import { z } from "zod/v4";
import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";
import { EditIcon, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SortableHeader } from "@/components/Products/ProductListing/sortable-header";
import { categorySchema, ProductSortOption } from "@/types/product.types";
import Link from "next/link";

const columnHelper = createColumnHelper<z.infer<typeof categorySchema>>();
export const createCategoryColumns = (onEdit: (id: number) => void, onDelete: (id: number) => void) => [
  columnHelper.accessor("name", {
    header: () => (
      <SortableHeader
        title="Category"
        sortOptions={[
          { label: "Name (A → Z)", value: ProductSortOption.NAME_ASC },
          { label: "Name (Z → A)", value: ProductSortOption.NAME_DESC },
        ]}
      />
    ),
    cell: (info) => <span className="pl-2">{info.getValue()}</span>,
  }),

  columnHelper.accessor("productsCount", {
    header: ({ column }) => (
      <SortableHeader
        title="Products"
        sortOptions={[
          {
            label: "Products (Low → High)",
            value: ProductSortOption.PRODUCT_COUNT_ASC,
          },
          {
            label: "Products (High → Low)",
            value: ProductSortOption.PRODUCT_COUNT_DESC,
          },
        ]}
      />
    ),
    cell: ({ row }) => <div className="px-4">24</div>,
  }),
  columnHelper.accessor("status", {
    header: () => (
      <SortableHeader
        title="status"
        sortOptions={[
          { label: "Status (A → Z)", value: ProductSortOption.STATUS_ASC },
          { label: "Status (Z → A)", value: ProductSortOption.STATUS_DESC },
        ]}
      />
    ),
    cell: ({ row }) => {
      return (
        <h2
          className={cn(
            // "w-fit rounded-full bg-[#FFFAA3] px-4 py-1 text-sm text-[#827C00] ",
            "w-fit rounded-full bg-[#E4FFDF] px-4 py-1 text-sm text-[#126D00]",
            // {
            //   "bg-[#E4FFDF] text-[#126D00]":
            //     row.getValue("status") === "PUBLISH",
            // },
          )}
        >
          Published
          {/* {row.getValue("status") === "PUBLISH"
              ? "Published"
              : row.getValue("status") === "DRAFT"
                ? "Draft"
                : row.getValue("status")} */}
        </h2>
      );
    },
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="!bg-muted-foreground/10 hover:!bg-muted-forground size-7 cursor-pointer rounded-full p-1.5 text-[#616FF5] hover:text-[#616FF5]"
            onClick={() => onEdit(row.original.id)}
          >
            <EditIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="!bg-muted-foreground/10 hover:!bg-muted-forground size-7 cursor-pointer rounded-full p-1.5 text-[#FF3333] hover:text-[#FF3333]"
            onClick={() => onDelete(row.original.id)}
          >
            <Trash2Icon />
          </Button>
        </div>
      );
    },
  }),
];
