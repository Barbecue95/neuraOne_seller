"use client";

import { Controller, type UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Editor } from "./rich-editor";
import { SelectGroup } from "@radix-ui/react-select";
import { EditProductPayload } from "@/components/Products/CreateProduct/ProductForm/product-form-schema";

interface ProductInfoSectionProps {
  form: UseFormReturn<EditProductPayload>;
  categories: { value: number; label: string }[];
  setSelectedCategoryId: (value: number) => void;
}

export default function ProductInfoSection({
  form,
  categories,
  setSelectedCategoryId,
}: ProductInfoSectionProps) {
  // if (!categories) return null;
  // console.log("form data", form.getValues("mainCategoryId"))

  return (
    <Card id="product-info">
      <CardHeader>
        <CardTitle>Product Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Product Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Product name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Product name"
                  {...field}
                  className="h-12 rounded-[20px] p-4"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={() => {
            return (
              <FormItem>
                <FormLabel>
                  Description <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Controller
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                      <Editor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Enter product description..."
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="mainCategoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Category <span className="text-red-500">*</span>
              </FormLabel>

              <Select
                value={field.value?.toString() ?? ""}
                onValueChange={(value) => {
                  const n = Number(value);
                  field.onChange(n);
                  setSelectedCategoryId(n);
                }}
              >
                <SelectTrigger className="!h-12 w-full cursor-pointer rounded-2xl">
                  <SelectValue placeholder="Main category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {categories.map((cat) => (
                      <SelectItem
                        key={cat.value}
                        value={cat.value.toString()}
                        className="cursor-pointer"
                      >
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
