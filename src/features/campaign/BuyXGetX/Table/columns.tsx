"use client";
import { z } from "zod/v4";
import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { CircleMinusIcon, DeleteIcon, EditIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { buyXGetYFreeSchema } from "../../campaignSchemas";

const columnHelper = createColumnHelper<z.infer<typeof buyXGetYFreeSchema>>();
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
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("startDate", {
    header: "Start Date",
    cell: (info) => {
      const date = info.getValue() as Date;
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
  }),
  columnHelper.accessor("endDate", {
    header: "End Date",
    cell: (info) => {
      const date = info.getValue() as Date;
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
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
          <Button
            variant="default"
            className="rounded-full"
            size="icon"
            onClick={() => {}}
          >
            <CircleMinusIcon className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  }),
];
