"use client";

import type { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditProductPayload } from "@/components/Products/CreateProduct/ProductForm/product-form-schema";
import { handleInputAmountChange } from "@/utils/numberFormat";

interface PricingSectionProps {
  form: UseFormReturn<EditProductPayload>;
}

export default function PricingSection({ form }: PricingSectionProps) {
  const discountEnabled = form.watch("promoteInfo.promoteStatus");
  const discountType = form.watch("promoteInfo.discountType");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Buying and Selling Price */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="purchasePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Buying Price <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Buying price"
                      className="h-12 rounded-[20px] p-4"
                      {...field}
                      onChange={(e) =>
                        field.onChange(handleInputAmountChange(e))
                      }
                      value={field.value === 0 ? "" : (field.value ?? "")}
                    />
                    <span className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500">
                      Ks
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sellingPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Selling Price <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Selling price"
                      className="h-12 rounded-[20px] p-4"
                      {...field}
                      onChange={(e) =>
                        field.onChange(handleInputAmountChange(e))
                      }
                      value={field.value === 0 ? "" : (field.value ?? "")}
                    />
                    <span className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500">
                      Ks
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="text-xs text-gray-500">
          * Buying price and selling price will be applied to all variants.
        </div>

        {/* Discount Section */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="promoteInfo.promoteStatus"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(v) => {
                      field.onChange(v);
                      if (v) {
                        form.setValue("promoteInfo.discountValue", undefined);
                      }
                    }}
                    className="cursor-pointer"
                  />
                </FormControl>
                <FormLabel>Discount</FormLabel>
              </FormItem>
            )}
          />

          {discountEnabled && (
            <div className="space-y-4 pl-4">
              <FormField
                control={form.control}
                name="promoteInfo.discountType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          form.setValue("promoteInfo.discountValue", 0);
                          field.onChange(value);
                        }}
                        value={field.value}
                        className="flex space-x-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="PERCENTAGE"
                            id="discount-percentage"
                            className="cursor-pointer"
                          />
                          <Label
                            htmlFor="discount-percentage"
                            className="cursor-pointer"
                          >
                            Percentage
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="AMOUNT"
                            id="discount-amount"
                            className="cursor-pointer"
                          />
                          <Label
                            htmlFor="discount-amount"
                            className="cursor-pointer"
                          >
                            Amount
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="promoteInfo.discountValue"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder={
                            discountType === "AMOUNT" ? "Amount" : "Percentage"
                          }
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              handleInputAmountChange(
                                e,
                                discountType === "AMOUNT" ? 10 : 2,
                              ),
                            )
                          }
                          value={field.value === 0 ? "" : (field.value ?? "")}
                          className="h-12 rounded-[20px] p-4"
                        />
                        <span className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500">
                          {discountType === "AMOUNT" ? "Ks" : "%"}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
