"use client";
import { z } from "zod/v4";
import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { CircleMinusIcon, DeleteIcon, EditIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { notificationSchema } from "../notificationSchemas";
import { format } from "date-fns";

const columnHelper = createColumnHelper<z.infer<typeof notificationSchema>>();
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
    header: "Title",
  }),
  columnHelper.accessor("audience", {
    header: "Audience",
  }),
  columnHelper.accessor("status", {
    header: "Status",
  }),
  columnHelper.accessor("sentDate", {
    header: "Sent Date",
    cell: (info) => {
      const data = info.row.original;
      return format(new Date(data.sentDate), "dd/MM/yyyy 'at' hh:mm a");
    },
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
