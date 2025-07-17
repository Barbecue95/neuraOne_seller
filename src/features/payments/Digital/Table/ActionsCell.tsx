import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  useDeletePaymentMethod,
  useUpdatePaymentMethod,
} from "@/queries/payment-method.queries";
import { CreateUpdatePaymentMethodPayload } from "@/types/payment-method.types";
import { Row } from "@tanstack/react-table";
import { se } from "date-fns/locale";
import { EditIcon, Trash2 } from "lucide-react";
import { useState } from "react";

export const ActionsCell = ({
  row,
}: {
  row: Row<CreateUpdatePaymentMethodPayload>;
}) => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { mutate: deletePaymentMethod } = useDeletePaymentMethod();
  const { mutate: updatePaymentMethod } = useUpdatePaymentMethod();

  const handleUpdate = () => {
    const payload: CreateUpdatePaymentMethodPayload = {
      id: row.original.id,
      name: row.original.name,
      accountNo: row.original.accountNo,
      accountName: row.original.accountName,
      qrCodeUrl: row.original.qrCodeUrl,
      cashOnDelivery: row.original.cashOnDelivery,
      imageUrl: row.original.imageUrl,
    };
    if (payload.id !== undefined) {
      updatePaymentMethod(payload);
    }
    setIsUpdateDialogOpen(false);
  };
  const handleDelete = () => {
    if (row.original.id !== undefined) {
      deletePaymentMethod(row.original.id);
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="flex flex-row gap-2">
      <Button
        variant="default"
        className="rounded-full"
        size="icon"
        onClick={() => {
          setIsUpdateDialogOpen(true);
        }}
      >
        <EditIcon className="h-4 w-4" />
      </Button>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" className="rounded-full" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
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
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
