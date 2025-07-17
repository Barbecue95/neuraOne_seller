import { z } from "zod";
import { createColumnHelper, Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DeleteIcon, EditIcon, EyeIcon, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { CreateUpdatePaymentMethodPayload } from "@/types/payment-method.types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger, // Add this
} from "@/components/ui/dialog";
import AddNewWallet from "../../AddNewWallet";
import { useState } from "react";
import {
  useDeletePaymentMethod,
  useUpdatePaymentMethod,
} from "@/queries/payment-method.queries";

const columnHelper = createColumnHelper<CreateUpdatePaymentMethodPayload>();

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
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Update Payment Method</DialogTitle>
        </DialogHeader>
        <AddNewWallet />
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
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>Are you sure you want to delete this payment method?</p>
          <p className="text-muted-foreground mt-2 text-sm">
            This action cannot be undone.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

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
    updatePaymentMethod(data);
  };

  const handleDelete = async () => {
    try {
      if (row.original.id !== undefined) {
        await deletePaymentMethod(row.original.id);
        setDeleteDialogOpen(false);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      // Optionally show error to user
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

export const bankColumns = [
  columnHelper.display({
    id: "id_select",
    header: () => <Checkbox />,
    cell: ({ row }) => (
      <Checkbox name={`bank-${row.id}`} id={`bank-${row.id}`} />
    ),
  }),
  columnHelper.accessor("id", {
    header: "ID",
  }),
  columnHelper.accessor("name", {
    header: "Bank Name",
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsCell row={row} />,
  }),
];
