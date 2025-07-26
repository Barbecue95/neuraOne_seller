"use client";
import { z } from "zod/v4";
import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { CircleMinusIcon, DeleteIcon, EditIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { flashSaleSchema } from "../../campaignSchemas";

const columnHelper = createColumnHelper<z.infer<typeof flashSaleSchema>>();
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
  columnHelper.accessor("banner", {
    header: "Name",
    cell: (info) => {
      const data = info.row.original;
      return (
        <div className="flex flex-row items-center gap-2">
          <img
            src={data.banner}
            alt="banner"
            className="h-24 w-80 object-cover"
          />
          <h2>{data.name}</h2>
        </div>
      );
    },
  }),
  columnHelper.accessor("startDate", {
    header: "Duration Left",
    cell: (info) => {
      const data = info.row.original;
      const diff = data.endDate.getTime() - data.startDate.getTime();
      const totalMinutes = Math.floor(diff / (1000 * 60));
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const reply = `${hours} hours ${minutes} minutes left`;
      return reply;
    },
    // return data.endDate.toTimeString() - data.startDate.toTimeString();
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
