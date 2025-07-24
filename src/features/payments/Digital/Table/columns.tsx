"use client";
import { useState } from "react";
import { z } from "zod";
import { createColumnHelper, Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { EditIcon, Trash2 } from "lucide-react";
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

import UpdateDigital from "../../AddNewWallet/UpdateDigital";
import CreditCardIcon from "@/utils/icons/CreditCardIcon";

const columnHelper = createColumnHelper<CreateUpdatePaymentMethodPayload>();

// Update Dialog Component for digital wallets
const UpdateDialog = ({
  isOpen,
  onOpenChange,
  initialData,
  onSave,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: CreateUpdatePaymentMethodPayload;
  onSave: (data: CreateUpdatePaymentMethodPayload) => void;
}) => {
  const handleSuccess = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Update Digital Wallet</DialogTitle>
        </DialogHeader>
        <UpdateDigital 
          initialData={initialData} 
          onSuccess={handleSuccess} 
        />
      </DialogContent>
    </Dialog>
  );
};

// Delete Confirmation Dialog
const DeleteDialog = ({
  isOpen,
  onOpenChange,
  onConfirm,
  isLoading,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading: boolean;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center py-4">
          <CreditCardIcon />
          <p>Do you want to delete this wallet?</p>
          <p className="text-muted-foreground mt-2 text-sm">
            This action cannot be undone.
          </p>
        </div>
        <div className="flex w-full justify-center">
          <DialogFooter>
            <DialogClose asChild>
              <Button className="w-50 rounded-full" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={onConfirm}
              disabled={isLoading}
              className="w-50 rounded-full"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Actions Cell Component
const ActionsCell = ({
  row,
}: {
  row: Row<CreateUpdatePaymentMethodPayload>;
}) => {
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { mutateAsync: deletePaymentMethod, isLoading: isDeleting } =
    useDeletePaymentMethod();
  const { mutate: updatePaymentMethod } = useUpdatePaymentMethod();

  const handleUpdate = (data: CreateUpdatePaymentMethodPayload) => {
    if (data.id !== undefined) {
      updatePaymentMethod({ payload: data, id: data.id });
    }
  };

  const handleDelete = async () => {
    if (row.original.id !== undefined) {
      await deletePaymentMethod(row.original.id);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-row gap-2">
      {/* Update Dialog Trigger */}
      <Button
        variant="default"
        className="rounded-full"
        size="icon"
        onClick={() => setUpdateDialogOpen(true)}
      >
        <EditIcon className="h-4 w-4" />
      </Button>

      {/* Delete Dialog Trigger */}
      <Button
        variant="destructive"
        className="rounded-full"
        size="icon"
        onClick={() => setDeleteDialogOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      {/* Update Dialog */}
      <UpdateDialog
        isOpen={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
        initialData={row.original}
        onSave={handleUpdate}
      />

      {/* Delete Dialog */}
      <DeleteDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
};
export const digitalColumns = [
  // Checkbox column
  columnHelper.display({
    id: "select",
    header: () => <Checkbox />,
    cell: ({ row }) => <Checkbox />,
  }),

  // Wallet name (left-aligned)
  columnHelper.display({
    id: "wallet",
    header: () => <div className="text-left">Wallet name</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Image
          src={row.original.imageUrl || "/default-wallet.png"}
          alt={row.original.name}
          width={30}
          height={30}
          className="rounded-md"
        />
        <span className="font-medium">{row.original.name}</span>
      </div>
    ),
  }),

  // Spacer with fixed width, invisible content
  columnHelper.display({
    id: "spacer",
    header: () => <div className="invisible w-32">Spacer</div>,
    cell: () => <div className="invisible w-32">Spacer</div>,
  }),

  // Status column (right-aligned)
  columnHelper.display({
    id: "status",
    header: () => <div className="text-right">Status</div>,
    cell: ({ row }) => {
      // If status is not a property, you can set a default or compute it here
      // For demonstration, let's assume all wallets are "Active"
      const status = (row.original as any).status ?? "Active";
      const badgeColor =
        status === "Active"
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700";

      return (
        <div className="flex justify-end">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}
          >
            {status}
          </span>
        </div>
      );
    },
  }),

  // Actions column (right-aligned)
  columnHelper.display({
    id: "actions",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => (
      <div className="flex justify-end gap-2">
        <ActionsCell row={row} />
      </div>
    ),
  }),
];
