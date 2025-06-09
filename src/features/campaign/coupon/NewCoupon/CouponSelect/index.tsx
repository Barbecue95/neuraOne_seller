import { z } from "zod/v4";
import React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { couponCodeSchema } from "@/features/campaign/campaignSchemas";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";

interface CouponSelectProps {
  form: UseFormReturn<z.infer<typeof couponCodeSchema>>;
}

export default function CouponSelect({ form }: CouponSelectProps) {
  const discountUnit = form.watch("discountUnit");
  const status = form.watch("status");

  return (
    <div className="bg-accent flex w-1/2 flex-col gap-4 px-10 py-5">
      <FormField
        control={form.control}
        name="couponCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Coupon Code Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="text"
                placeholder="Code Name"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="discountUnit"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={(e) => {
                  form.resetField("discount", { defaultValue: "" });
                  field.onChange(e);
                }}
                defaultValue={field.value}
                className="flex flex-row"
              >
                <FormItem className="flex items-center gap-3">
                  <FormControl>
                    <RadioGroupItem value="percentage" />
                  </FormControl>
                  <FormLabel className="font-normal">Percentage</FormLabel>
                </FormItem>
                <FormItem className="flex items-center gap-3">
                  <FormControl>
                    <RadioGroupItem value="amount" />
                  </FormControl>
                  <FormLabel className="font-normal">Ks</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="discount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Discount</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder={
                  discountUnit === "percentage"
                    ? "Discount Percentage"
                    : "Discount Amount"
                }
                value={field.value}
                onChange={(e) => {
                  const numericOnly = e.target.value.replace(/[^0-9]/g, "");
                  field.onChange(numericOnly);
                }}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="expiredDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Expired Data</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground",
                    )}
                    disabled={status === "Private"}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}

                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value ?? undefined}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date()}
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
            {status === "Private" && (
              <FormDescription className="font-semibold text-black">
                Private Coupon Code does not expire
              </FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="limit"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex flex-row items-center">
              Usage limit per customer{" "}
              <Switch
                checked={field.value !== null}
                onCheckedChange={(checked) => {
                  field.onChange(checked ? "" : null);
                }}
              />
            </FormLabel>
            {field.value !== null && (
              <FormControl>
                <Input
                  type="text"
                  placeholder="Usage limit"
                  value={field.value}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onChange={(e) => {
                    const numericOnly = e.target.value.replace(/[^0-9]/g, "");
                    field.onChange(numericOnly);
                  }}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </FormControl>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="minimumAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Minimum purchase rate</FormLabel>
            <FormControl>
              <div className="relative flex flex-row items-center gap-2">
                <Input
                  {...field}
                  type="text"
                  placeholder="Amount"
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <span className="text-muted-foreground absolute right-5 text-xs">
                  KS
                </span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(e) => {
                  form.setValue("expiredDate", null);
                  field.onChange(e);
                }}
                defaultValue={field.value}
                className="flex flex-row"
              >
                <FormItem className="flex items-center gap-3">
                  <FormControl>
                    <RadioGroupItem value="Public" />
                  </FormControl>
                  <FormLabel className="font-normal">Public</FormLabel>
                </FormItem>
                <FormItem className="flex items-center gap-3">
                  <FormControl>
                    <RadioGroupItem value="Private" />
                  </FormControl>
                  <FormLabel className="font-normal">Private</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
