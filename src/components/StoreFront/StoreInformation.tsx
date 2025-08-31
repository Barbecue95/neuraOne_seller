"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import UploadIcon from "./UploadIcon";

const storeSchema = z.object({
  storeName: z.string().min(1, "Store name is required"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  storeAddress: z.string().min(1, "Store address is required"),
  deliveryFees: z.string().min(1, "Delivery fees is required"),
  storeLogo: z.any().optional(),
});

type StoreFormData = z.infer<typeof storeSchema>;

export function StoreInformationForm() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
  });

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("storeLogo", file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: StoreFormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
  };

  return (
    <div className="bg-card rounded-[10px]">
      <h1 className="text-foreground border-b p-5 text-2xl font-semibold">
        Store Information
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-5">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="col-span-1 space-y-6 md:col-span-2">
            {/* Store Logo Section */}
            <div className="space-y-2">
              <Label className="text-foreground text-base font-medium">
                Store Logo
              </Label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                />
                <div className="border-muted-foreground/30 bg-muted/20 hover:bg-muted/30 flex h-48 flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors">
                  {logoPreview ? (
                    <img
                      src={logoPreview || "/placeholder.svg"}
                      alt="Store logo preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <UploadIcon />
                  )}
                </div>
              </div>
            </div>

            {/* Delivery Fees */}
            <div className="space-y-2">
              <Label
                htmlFor="deliveryFees"
                className="text-foreground text-base font-medium"
              >
                Delivery Fees
              </Label>
              <div className="relative">
                <Input
                  id="deliveryFees"
                  placeholder="Amount"
                  {...register("deliveryFees")}
                  className="h-12 pr-12"
                />
                <div className="text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2">
                  Ks
                </div>
              </div>
              {errors.deliveryFees && (
                <p className="text-destructive text-sm">
                  {errors.deliveryFees.message}
                </p>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="col-span-1 space-y-6 md:col-span-3">
            {/* Store Name */}
            <div className="space-y-2">
              <Label
                htmlFor="storeName"
                className="text-foreground text-base font-medium"
              >
                Store Name
              </Label>
              <Input
                id="storeName"
                placeholder="Name"
                {...register("storeName")}
                className="h-12"
              />
              {errors.storeName && (
                <p className="text-destructive text-sm">
                  {errors.storeName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-foreground text-base font-medium"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email")}
                className="h-12"
              />
              {errors.email && (
                <p className="text-destructive text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label
                htmlFor="phoneNumber"
                className="text-foreground text-base font-medium"
              >
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                placeholder="Phone number"
                {...register("phoneNumber")}
                className="h-12"
              />
              {errors.phoneNumber && (
                <p className="text-destructive text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Store Address */}
            <div className="space-y-2">
              <Label
                htmlFor="storeAddress"
                className="text-foreground text-base font-medium"
              >
                Store Address
              </Label>
              <Textarea
                id="storeAddress"
                placeholder="Store Address"
                {...register("storeAddress")}
                className="min-h-32 resize-none"
              />
              {errors.storeAddress && (
                <p className="text-destructive text-sm">
                  {errors.storeAddress.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <Button type="submit" className="w-28">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
