"use client";
import SubNavbar from "@/components/SubNavbar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { deliverySchema } from "@/features/delivery/deliverySchema";
import { citiesData } from "@/features/delivery/Table/dummy-data";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
export default function Page() {
  const form = useForm({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      isFreeDelivery: true,
      deliveryType: "Flat",
      companyInfo: {
        companyName: "",
        email: "",
        phoneNo: "",
        postalCode: "",
        address: "",
        city: "",
      },
    },
  });
  // watch list
  const isFreeDelivery = form.watch("isFreeDelivery");
  const deliveryType = form.watch("deliveryType");

  const onSubmit = (data: z.infer<typeof deliverySchema>) => {
    console.log(data);
  };
  const [flatDeliveryFee, setfaltDeliveryFee] = useState("0");
  return (
    <div>
      <SubNavbar title="Create New Shipment sender" />
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-4 p-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="bg-accent flex w-full flex-col gap-4 p-5">
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Sender Details
            </h2>
            <div className="flex flex-row items-center gap-4">
              <div className="bg-accent-foreground aspect-video w-32" />
              <FormField
                control={form.control}
                name="companyInfo.companyName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} placeholder="Company Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row flex-wrap items-center justify-between gap-4">
              <FormField
                control={form.control}
                name="companyInfo.email"
                render={({ field }) => (
                  <FormItem className="w-5/12">
                    <FormControl>
                      <Input {...field} placeholder="Email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyInfo.phoneNo"
                render={({ field }) => (
                  <FormItem className="w-5/12">
                    <FormControl>
                      <Input {...field} placeholder="Phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyInfo.postalCode"
                render={({ field }) => (
                  <FormItem className="w-5/12">
                    <FormControl>
                      <Input {...field} placeholder="Postal Code" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyInfo.address"
                render={({ field }) => (
                  <FormItem className="w-5/12">
                    <FormControl>
                      <Input {...field} placeholder="Address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyInfo.city"
                render={({ field }) => (
                  <FormItem className="w-5/12">
                    <FormControl>
                      <Input {...field} placeholder="City" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div></div>
          </div>
          <div className="bg-accent flex w-full flex-col gap-4 p-5">
            <div>
              <div className="flex flex-row justify-between">
                <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Delivery cities
                </h2>
                <div className="flex flex-row items-center gap-4">
                  <FormField
                    control={form.control}
                    name="isFreeDelivery"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2">
                        <FormLabel className="scroll-m-20 text-xl font-semibold tracking-tight text-nowrap">
                          All Cities free delivery
                        </FormLabel>
                        <FormControl>
                          <Switch
                            onCheckedChange={field.onChange}
                            checked={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {!isFreeDelivery && (
                <div className="bg-accent-foreground text-accent mt-5">
                  <div className="flex flex-row items-center justify-between gap-4 p-5 px-24">
                    <h3 className="w-1/3">City Name</h3>
                    <h4 className="w-1/3">Delivery Duration</h4>
                    <h4 className="w-1/3">Delivery Fee</h4>
                  </div>
                  {citiesData.map((city) => (
                    <div
                      className="flex flex-row items-center justify-between gap-4 p-5 px-24"
                      key={city.id}
                    >
                      <h3 className="w-1/3">{city.cityName}</h3>
                      <h4 className="w-1/3">{city.duration}</h4>
                      <h4 className="w-1/3">{city.deliveryFee} Ks</h4>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="bg-accent flex w-full flex-col gap-4 p-5">
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Delivery Type
            </h2>
            <div
              className={cn([
                "flex h-56 items-start space-x-4 text-sm",
                { "h-[450px]": deliveryType !== "Flat" },
              ])}
            >
              <FormField
                control={form.control}
                name="deliveryType"
                render={({ field }) => (
                  <FormItem className="py-5">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-44">
                          <SelectValue placeholder="Select delivery type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Flat">Flat rate</SelectItem>
                        <SelectItem value="Weight">Weight based</SelectItem>
                        <SelectItem value="Size">Size based</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator
                className="bg-accent-foreground"
                orientation="vertical"
              />
              <div className="min-w-64 py-5">
                {deliveryType === "Flat" && (
                  <div className="relative">
                    <Input
                      placeholder="Flat Delivery Fee"
                      type="text"
                      value={flatDeliveryFee}
                      onChange={(e) =>
                        setfaltDeliveryFee(
                          e.target.value.match(/[0-9]/g)?.join("") as string,
                        )
                      }
                    />
                    <span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2">
                      Ks
                    </span>
                  </div>
                )}
                {deliveryType === "Weight" && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row items-center justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
                          Weight Range
                        </h4>
                      </div>
                      <div className="flex flex-1 items-center">
                        <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
                          Delivery Cost
                        </h4>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex flex-row items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="rounded-md border p-3">
                          <span>Under 3 kg</span>
                        </div>
                      </div>
                      <div className="flex flex-1 items-center">
                        <Input
                          className="pr-12"
                          type="text"
                          defaultValue="Free"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="rounded-md border p-3">
                          <span>Equal 3 kg</span>
                        </div>
                      </div>
                      <div className="relative flex flex-1 items-center">
                        <Input
                          className="pr-12"
                          placeholder="1000"
                          type="number"
                          min={0}
                          value="1000"
                          readOnly
                        />
                        <span className="text-muted-foreground absolute right-4">
                          Ks
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="rounded-md border p-3">
                          <span>Over 3 kg</span>
                        </div>
                      </div>
                      <div className="relative flex flex-1 items-center">
                        <span className="mr-2 text-nowrap">1 kg =</span>
                        <Input
                          className="pr-12"
                          placeholder="1000"
                          type="number"
                          min={0}
                          value="1000"
                          readOnly
                        />
                        <span className="text-muted-foreground absolute right-4">
                          Ks
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {deliveryType === "Size" && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row items-center justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
                          Size
                        </h4>
                      </div>
                      <div className="flex flex-1 items-center">
                        <h4 className="flex scroll-m-20 flex-col justify-center text-lg font-semibold tracking-tight text-nowrap">
                          <span>Dimension</span>
                          <span className="text-nowrap">
                            (Length, Width, Height)
                          </span>
                        </h4>
                      </div>
                      <div className="flex-1">
                        <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
                          Delivery cost
                        </h4>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex flex-row items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="rounded-md border p-3">
                          <span>Small</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="rounded-md border p-3">
                          <span>Up to 30, 30, 30 cm</span>
                        </div>
                      </div>
                      <div className="flex flex-1 items-center">
                        <Input
                          className="pr-12"
                          type="text"
                          defaultValue="Free"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="rounded-md border p-3">
                          <span>Medium</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="rounded-md border p-3">
                          <span>31, 31, 31 to 60, 60, 60 cm</span>
                        </div>
                      </div>
                      <div className="relative flex flex-1 items-center">
                        <Input
                          className="pr-12"
                          placeholder="1000"
                          type="number"
                          min={0}
                          value="1000"
                          readOnly
                        />
                        <span className="text-muted-foreground absolute right-4">
                          Ks
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="rounded-md border p-3">
                          <span>Large</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="rounded-md border p-3">
                          <span>61, 61, 61 cm and above</span>
                        </div>
                      </div>
                      <div className="relative flex flex-1 items-center">
                        <Input
                          className="pr-12"
                          placeholder="1000"
                          type="number"
                          min={0}
                          value="1000"
                          readOnly
                        />
                        <span className="text-muted-foreground absolute right-4">
                          Ks
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="rounded-md border p-3">
                          <span>Extra Large</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="rounded-md border p-3">
                          <span>Above 100, 100, 100 cm</span>
                        </div>
                      </div>
                      <div className="relative flex flex-1 items-center">
                        <Input
                          className="pr-12"
                          placeholder="1000"
                          type="text"
                          min={0}
                          value="Not delivered"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex w-full justify-end gap-4 py-5">
                  <Button variant="outline" className="w-1/3">
                    Cancel
                  </Button>
                  <Button type="submit" className="w-1/3">
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
