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
import dynamic from "next/dynamic";
import { Editor } from "./rich-editor";
import { SelectGroup } from "@radix-ui/react-select";
import { EditProductPayload } from "@/components/Products/CreateProduct/ProductForm/product-form-schema";
import { usePathname } from "next/navigation";

interface ProductInfoSectionProps {
  form: UseFormReturn<EditProductPayload>;
  categories: any[];
  setSelectedCategoryId: (value: number) => void;
}

export default function ProductInfoSection({
  form,
  categories,
  setSelectedCategoryId,
}: ProductInfoSectionProps) {
  const pathname = usePathname();

  const isEditPage = pathname.includes("edit");

  // if (!categories) return null;
  // console.log("form data", form.getValues("mainCategoryId"))

  return (
    <Card>
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
                <Input placeholder="Product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => {
            const { ref, onChange, ...rest } = field;

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

        {/* Category */}
        <FormField
          control={form.control}
          name="mainCategoryId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  Category <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  disabled={isEditPage}
                  onValueChange={(value) => {
                    if (!isEditPage) {
                      field.onChange(Number(value));
                      setSelectedCategoryId(Number(value));
                    }
                  }}
                  value={field.value?.toString() ?? ""}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Main category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="0">Main category</SelectItem>
                      {categories?.map((category) => (
                        <SelectItem
                          key={category.value}
                          value={category.value.toString()}
                        >
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </CardContent>
    </Card>
  );
}
