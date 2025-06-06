"use client";
import { z } from "zod";
import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DeleteIcon, EditIcon, EyeIcon } from "lucide-react";
import { dummyBank } from "../../dummy-wallet";
import { Checkbox } from "@/components/ui/checkbox";
import { bankColumnsSchema } from "../../paymentSchema";

const columnHelper = createColumnHelper<z.infer<typeof bankColumnsSchema>>();

export const bankColumns = [
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
    header: "Wallet",
    cell: (info) => {
      return (
        <span>{dummyBank[(info.getValue() as number) - 1]?.label ?? ""}</span>
      );
    },
  }),
  columnHelper.accessor("accountName", {
    header: "Account Name",
  }),
  columnHelper.accessor("accountNumber", {
    header: "Account Number",
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
              window.location.href = `/payments/digital/${row.id}`;
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
