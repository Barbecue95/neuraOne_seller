"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import DigitalDetail from "../Digital/DigitalDetail";
import { DialogClose } from "@/components/ui/dialog";
import { useUpdatePaymentMethod } from "@/queries/payment-method.queries";
import {
  CreateUpdatePaymentMethodPayload,
  CreateUpdatePaymentMethodPayloadSchema,
} from "@/types/payment-method.types";

interface UpdateDigitalProps {
  initialData: CreateUpdatePaymentMethodPayload;
  onSuccess: () => void;
}

const UpdateDigital = ({ initialData, onSuccess }: UpdateDigitalProps) => {
  // 1. Define your form.
  const form = useForm<CreateUpdatePaymentMethodPayload>({
    resolver: zodResolver(CreateUpdatePaymentMethodPayloadSchema),
    defaultValues: {
      accountType: "PAY",
      name: "",
      qrCodeUrl: "",
      accountName: "",
      accountNo: "",
      cashOnDelivery: false,
      imageUrl: "",
    },
  });

  // Set form values when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        accountType: initialData.accountType || "PAY",
        name: initialData.name || "",
        qrCodeUrl: initialData.qrCodeUrl || "",
        accountName: initialData.accountName || "",
        accountNo: initialData.accountNo || "",
        cashOnDelivery: initialData.cashOnDelivery || false,
        imageUrl: initialData.imageUrl || "",
      });
    }
  }, [initialData, form]);

  const { mutate: updatePaymentMethod } = useUpdatePaymentMethod();

  const onSubmit = (data: CreateUpdatePaymentMethodPayload) => {
    console.log("Form submitted with data:", data);
    
    if (!initialData.id) {
      console.error("No ID provided for update");
      return;
    }

    const payload = {
      accountType: data.accountType,
      name: data.name,
      accountNo: data.accountNo,
      accountName: data.accountName,
      cashOnDelivery: false, // Assuming this is not applicable for digital wallets
      qrCodeUrl: data.qrCodeUrl, // Include qrCodeUrl field (optional)
      imageUrl: data.imageUrl, // Include imageUrl field (optional)
    };

    updatePaymentMethod(
      { payload, id: initialData.id },
      {
        onSuccess: () => {
          console.log("Digital wallet updated successfully");
          onSuccess();
        },
        onError: (error) => {
          console.error("Error updating digital wallet:", error);
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <DigitalDetail form={form} />
        <div className="flex w-full flex-row gap-2">
          <DialogClose asChild>
            <Button variant="outline" type="button" className="w-1/2">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" className="w-1/2">
            Update Digital Wallet
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateDigital;
