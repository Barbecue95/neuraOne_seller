"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { flashSaleSchema } from "../campaignSchemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import ProductSelector from "../ProductSelector";
import { z } from "zod/v4";

export default function CreateFlashSale() {
  const form = useForm({
    resolver: zodResolver(flashSaleSchema),
    defaultValues: {
      id: 0,
      name: "",
      description: "",
      banner: "",
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 60 * 60 * 1000),
      discountUnit: "percentage",
      discount: "",
    },
  });
  const discountUnit = form.watch("discountUnit");
  const startDate = form.watch("startDate");
  const endDate = form.watch("endDate");
  const onSubmit = (data: z.infer<typeof flashSaleSchema>) => {
    console.log("Form submitted with data:", data);
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="bg-accent flex flex-row justify-between gap-32 p-5">
          <div className="flex w-1/2 flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Campaign Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Campaign Name"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type here"
                        className="max-w-80 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div>
              <FormField
                control={form.control}
                name="discountUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2">Discount</FormLabel>
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
                          <FormLabel className="font-normal">
                            Percentage
                          </FormLabel>
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
                  <FormItem className="mt-2">
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
                          const numericOnly = e.target.value.replace(
                            /[^0-9]/g,
                            "",
                          );
                          field.onChange(numericOnly);
                        }}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="banner"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <label
                      className="flex cursor-pointer flex-col gap-2 text-sm font-medium"
                      htmlFor="banner"
                    >
                      <span className="">Upload Banner</span>
                      <div className="bg-accent-foreground h-44 w-full" />
                      <Input
                        title="banner"
                        id="banner"
                        placeholder="Enter banner"
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
                    </label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="bg-accent flex flex-col gap-4 p-5">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Active Dates
          </h2>
          <div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            id="time"
                            step="1"
                            value={
                              field.value
                                ? format(field.value, "HH:mm:ss")
                                : "10:30:00"
                            }
                            onChange={(e) => {
                              const time = e.target.value;
                              const date = new Date(
                                field.value?.getTime() || new Date(),
                              );
                              date.setHours(Number(time.split(":")[0]));
                              date.setMinutes(Number(time.split(":")[1]));
                              date.setSeconds(Number(time.split(":")[2]));
                              field.onChange(date);
                            }}
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            id="time"
                            step="1"
                            value={
                              field.value
                                ? format(field.value, "HH:mm:ss")
                                : "10:30:00"
                            }
                            onChange={(e) => {
                              const time = e.target.value;
                              const date = new Date(
                                field.value?.getTime() || new Date(),
                              );
                              date.setHours(Number(time.split(":")[0]));
                              date.setMinutes(Number(time.split(":")[1]));
                              date.setSeconds(Number(time.split(":")[2]));
                              field.onChange(date);
                            }}
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <ProductSelector />
        <div className="flex w-1/2 flex-row gap-2 self-end px-2">
          <Button className="w-1/2" variant="outline">
            Cancel
          </Button>
          <Button type="submit" className="w-1/2">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
