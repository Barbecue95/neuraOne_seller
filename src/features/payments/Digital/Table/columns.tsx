"use client";
import { z } from "zod";
import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DeleteIcon, EditIcon, EyeIcon, Trash } from "lucide-react";
import { dummyWallet } from "../../dummy-wallet";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { digitalColumnsSchema } from "../../paymentSchema";
import {
  CreateUpdatePaymentMethodPayload,
  CreateUpdatePaymentMethodPayloadSchema,
} from "@/types/payment-method.types";
import {
  useDeletePaymentMethod,
  useUpdatePaymentMethod,
} from "@/queries/payment-method.queries";

const columnHelper = createColumnHelper<CreateUpdatePaymentMethodPayload>();

export const digitalColumns = [
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
    header: "Digital Pay",
    cell: (info) => {
      return (
        <span className="flex flex-row items-center gap-2">
          {/* {info.row.original.imageUrl.length > 0 && (
            <Image
              src={info.row.original.imageUrl || ""}
              width={50}
              height={50}
              className="size-12"
              alt="qr-code"
            />
          )} */}
        </span>
      );
    },
  }),
  columnHelper.accessor("name", {
    header: "Pay Name",
  }),

  // columnHelper.accessor("status", {
  //   header: "Status",
  // }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { mutate: deletePaymentMethod } = useDeletePaymentMethod();
      const { mutate: updatePaymentMethod } = useUpdatePaymentMethod();
      const handleUpdate = () => {
        const payload = {
          id: row.original.id,
          name: row.original.name,
          accountNo: row.original.accountNo,
          accountName: row.original.accountName,
          qrCodeUrl: row.original.qrCodeUrl,
          cashOnDelivery: row.original.cashOnDelivery,
          imageUrl: row.original.imageUrl,
          // Add other fields as needed for updating
        };
        if (payload.id !== undefined) {
          updatePaymentMethod(payload);
        }
      };
      const handleDelete = () => {
        const payload = {
          id: row.original.id,
        };
        if (payload.id !== undefined) {
          deletePaymentMethod(payload.id);
        }
      };
      return (
        <div className="flex flex-row gap-2">
          {/* <Button
            variant="default"
            className="rounded-full"
            size="icon"
            onClick={() => {
              window.location.href = `/payments/digital/${row.id}`;
            }}
          >
            <EyeIcon className="h-4 w-4" />
          </Button> */}
          <Button
            variant="default"
            className="rounded-full"
            size="icon"
            onClick={handleUpdate}
          >
            <EditIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            className="rounded-full"
            size="icon"
            onClick={handleDelete}
          >
            {/* <DeleteIcon className="h-4 w-4" /> */}
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  }),
];
