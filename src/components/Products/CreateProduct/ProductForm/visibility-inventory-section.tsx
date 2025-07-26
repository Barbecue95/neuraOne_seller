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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditProductPayload } from "@/components/Products/CreateProduct/ProductForm/product-form-schema";
import { handleInputAmountChange } from "@/utils/numberFormat";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface VisibilityInventorySectionProps {
  form: UseFormReturn<EditProductPayload>;
}

export default function VisibilityInventorySection({
  form,
}: VisibilityInventorySectionProps) {
  const [WeightOrSize, setWeightOrSize] = useState<string>("Weight");
  return (
    <div className="space-y-6">
      {/* Visibility */}
      {/* <Card>
        <CardHeader>
          <CardTitle>
            Visibility <span className="text-red-500">*</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-row gap-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={ProductStatus.PUBLISHED}
                        id="published"
                      />
                      <Label htmlFor="published">Published</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={ProductStatus.SCHEDULED}
                        id="scheduled"
                      />
                      <Label htmlFor="scheduled">Scheduled</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={ProductStatus.DRAFT} id="hidden" />
                      <Label htmlFor="hidden">Hidden</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("status") === ProductStatus.SCHEDULED && (
            <FormField
              control={form.control}
              name="scheduleDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Calendar28
                        onChange={field.onChange}
                        formValue={field.value}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </CardContent>
      </Card> */}

      {/* Inventory */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Stock <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Stock"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number(handleInputAmountChange(e)))
                    }
                    value={field.value === 0 ? "" : (field.value ?? "")}
                    className="h-12 rounded-[20px] p-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full flex-row items-end gap-2">
            {WeightOrSize === "Weight" ? (
              <div className="relative w-2/3">
                <FormField
                  control={form.control}
                  name="weightValue"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="sr-only">Weight</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Weight"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              Number(handleInputAmountChange(e, 5)),
                            )
                          }
                          value={field.value === 0 ? "" : (field.value ?? "")}
                          className="h-12 rounded-[20px] p-4"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weightUnit"
                  render={({ field }) => (
                    <FormItem className="absolute right-0 bottom-0 w-18 min-w-fit rounded-[20px] border-none">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-18 rounded-[20px] border-none px-4 py-6 select-none">
                            <SelectValue placeholder={"Kg"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">Kg</SelectItem>
                            <SelectItem value="lb">Lb</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ) : (
              <div className="relative w-2/3">
                <FormField
                  control={form.control}
                  name="sizeValue"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="sr-only">Size</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Size"
                          {...field}
                          onChange={(e) => {
                            e.target.value = e.target.value.slice(0, 20);
                            field.onChange(e);
                          }}
                          value={field.value === "0" ? "" : (field.value ?? "")}
                          className="h-12 rounded-[20px] p-4"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sizeUnit"
                  render={({ field }) => (
                    <FormItem className="absolute right-0 bottom-0 w-18 min-w-fit rounded-[20px] border-none">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="h-12 w-18 rounded-[20px] border-none px-4 py-6 select-none">
                            <SelectValue placeholder="cm" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cm">cm</SelectItem>
                            <SelectItem value="in">In</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <Select
              onValueChange={(value) => {
                setWeightOrSize(value);
                if (value === "Weight") {
                  form.resetField("weightUnit");
                  form.resetField("weightValue");
                } else {
                  form.resetField("sizeUnit");
                  form.resetField("sizeValue");
                }
              }}
              value={WeightOrSize}
            >
              <SelectTrigger className="h-12 w-1/3 rounded-[20px] p-4 py-6">
                <SelectValue placeholder="Weight" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="Weight">Weight</SelectItem>
                <SelectItem value="Size">Size</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  SKU <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="SKU"
                    {...field}
                    className="h-12 rounded-[20px] p-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
