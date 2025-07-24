"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import DigitalDetail from "../Digital/DigitalDetail";
import { digitalWalletSchema } from "../paymentSchema";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { useCreatePaymentMethod } from "@/queries/payment-method.queries";
import {
  CreateUpdatePaymentMethodPayload,
  CreateUpdatePaymentMethodPayloadSchema,
} from "@/types/payment-method.types";
import { useState } from "react";

const NewDigital = () => {
  const [isActive, setIsActive] = useState("ACTIVE");
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

  const { mutate: createPaymentMethod } = useCreatePaymentMethod(form);

  const onSubmit = (data: CreateUpdatePaymentMethodPayload) => {
    console.log("Form submitted with data:", data);
    const payload = {
      accountType: data.accountType,
      name: data.name,
      accountNo: data.accountNo,
      accountName: data.accountName,
      cashOnDelivery: false, // Assuming this is not applicable for digital wallets
      qrCodeUrl: data.qrCodeUrl, // Include qrCodeUrl field (optional)
      imageUrl: data.imageUrl,
      status: isActive === "ACTIVE" ? "ACTIVE" : "DRAFT",
    };
    createPaymentMethod(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <DigitalDetail form={form} />
        <div className="flex w-full flex-row gap-2">
          <DialogTrigger asChild>
            <Button
              variant="outline"
              type="submit"
              onClick={() => {
                setIsActive("DRAFT");
              }}
              className="w-1/2"
            >
              Save as Draft
            </Button>
          </DialogTrigger>
          <Button type="submit" className="w-1/2">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewDigital;
