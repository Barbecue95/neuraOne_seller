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
import { CreateUpdatePaymentMethodPayload } from "@/types/payment-method.types";

export default function BankDetail({
  form,
}: {
  form: UseFormReturn<CreateUpdatePaymentMethodPayload>;
}) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="accountType"
        render={({ field }) => {
          return (
            <Input
              title="account type"
              id="accountType"
              placeholder="Account Type"
              type="text"
              className="hidden"
              {...field}
            />
          );
        }}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => {
          return (
            <Combobox
              List={dummyBank}
              title="Select a bank"
              placeholder="Search bank ....."
              form={form}
              {...field}
            />
          );
        }}
      />
      {/* <FormField
        control={form.control}
        name="qrCodeUrl"
        render={({ field }) => {
          return (
            <FormItem>
              <FormControl>
                <label
                  className="flex cursor-pointer flex-row items-center gap-2 text-sm font-medium"
                  htmlFor="qrCodeUrl"
                >
                  <div className="bg-accent-foreground size-44" />
                  <Input
                    title="QR Code"
                    id="qrCodeUrl"
                    placeholder="Enter QR Code"
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    {...field}
                    // TODO: Handle file upload properly
                    // onChange={(e) => {
                    //   if (!!e?.target?.files) {
                    //     field.onChange({
                    //       target: {
                    //         value: e.target.files[0],
                    //         name: field.name,
                    //       },
                    //     });
                    //   }
                    // }}
                  />
                  <span className="text-muted-foreground">Upload QR Code</span>
                </label>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      /> */}
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
        name="accountNo"
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
