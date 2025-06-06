"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import DigitalDetail from "../Digital/DigitalDetail";
import { digitalWalletSchema } from "../paymentSchema";
import { Button } from "@/components/ui/button";

const NewDigital = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof digitalWalletSchema>>({
    resolver: zodResolver(digitalWalletSchema),
    defaultValues: {
      qrcode: "",
      accountName: "",
      accountNumber: "",
      status: "active",
    },
  });
  const onSubmit = (data: z.infer<typeof digitalWalletSchema>) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <DigitalDetail form={form} />
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default NewDigital;
