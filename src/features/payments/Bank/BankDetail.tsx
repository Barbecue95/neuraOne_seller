import React from "react";
import { dummyBank } from "../dummy-wallet";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { bankWalletSchema } from "../paymentSchema";
import { z } from "zod";
import { Combobox } from "@/components/ComboBox/BankComboBox";

export default function BankDetail({
  form,
}: {
  form: UseFormReturn<z.infer<typeof bankWalletSchema>>;
}) {
  return (
    <div className="space-y-2">
      <FormField
        control={form.control}
        name="id"
        render={({ field }) => {
          return (
            <Combobox
              List={dummyBank}
              title="Select a Bank"
              placeholder="Search Bank ....."
              form={form}
              {...field}
            />
          );
        }}
      />
      <FormField
        control={form.control}
        name="accountName"
        render={({ field }) => {
          return (
            <FormItem>
              <FormControl>
                <Input
                  title="Account Name"
                  placeholder="Enter Account Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        control={form.control}
        name="accountNumber"
        render={({ field }) => {
          return (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter Account Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}
