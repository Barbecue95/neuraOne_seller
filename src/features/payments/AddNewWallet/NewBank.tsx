"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { bankWalletSchema } from "../paymentSchema";
import { Button } from "@/components/ui/button";
import BankDetail from "../Bank/BankDetail";
import { DialogTrigger } from "@/components/ui/dialog";

const NewBank = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof bankWalletSchema>>({
    resolver: zodResolver(bankWalletSchema),
    defaultValues: {
      accountName: "",
      accountNumber: "",
      status: "active",
    },
  });
  const onSubmit = (data: z.infer<typeof bankWalletSchema>) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <BankDetail form={form} />
        <div className="flex w-full flex-row gap-2">
          <DialogTrigger asChild>
            <Button
              variant="outline"
              onClick={() => {
                form.reset();
              }}
              className="w-1/2"
            >
              Cancel
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

export default NewBank;
