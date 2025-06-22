import { Combobox } from "@/components/ComboBox/DigitalComboBox";
import React from "react";
import { dummyWallet } from "../dummy-wallet";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { digitalWalletSchema } from "../paymentSchema";
import { z } from "zod";

export default function DigitalDetail({
  form,
}: {
  form: UseFormReturn<z.infer<typeof digitalWalletSchema>>;
}) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="id"
        render={({ field }) => {
          return (
            <Combobox
              List={dummyWallet}
              title="Select a wallet"
              placeholder="Search wallet ....."
              form={form}
              {...field}
            />
          );
        }}
      />
      <FormField
        control={form.control}
        name="qrcode"
        render={({ field }) => {
          return (
            <FormItem>
              <FormControl>
                <label
                  className="flex cursor-pointer flex-row items-center gap-2 text-sm font-medium"
                  htmlFor="qrcode"
                >
                  <div className="bg-accent-foreground size-44" />
                  <Input
                    title="QR Code"
                    id="qrcode"
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
                <Input placeholder="Enter Phone Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}
