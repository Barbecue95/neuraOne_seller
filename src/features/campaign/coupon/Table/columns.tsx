"use client";
import { z } from "zod/v4";
import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DeleteIcon, EditIcon, EyeIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { couponCodeColumnsSchema } from "../../campaignSchemas";

const columnHelper =
  createColumnHelper<z.infer<typeof couponCodeColumnsSchema>[number]>();
export const columns = [
  columnHelper.display({
    id: "id_select",
    header: () => {
      return <Checkbox />;
    },
    cell: ({ row }) => {
      return <Checkbox name={row.id} id={row.id} />;
    },
  }),
  columnHelper.accessor("couponCode", {
    header: "Code",
  }),
  columnHelper.accessor("expiredDate", {
    header: "Expired Date",
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
  columnHelper.accessor("limit", {
    header: "Limit",
  }),
  columnHelper.accessor("discount", {
    header: "Discount",
    cell: (info) => {
      const data = info.row.original;
      return (
        <span>
          {data.discountUnit === "percentage"
            ? `${data.discount}%`
            : `${data.discount} Ks`}
        </span>
      );
    },
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
