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
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import type { CreateProductPayload } from "@/types/product.types";
import { Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";
import { Editor } from "./rich-editor";

interface ProductInfoSectionProps {
  form: UseFormReturn<CreateProductPayload>;
  categories: any[];
  setSelectedCategoryId: Dispatch<SetStateAction<number | null>>;
}

export default function ProductInfoSection({
  form,
  categories,
  setSelectedCategoryId,
}: ProductInfoSectionProps) {
  const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

  if (!categories) return null;

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
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Category <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(Number(value)); // your form expects number
                  setSelectedCategoryId(Number(value));
                }}
                value={field.value?.toString() ?? ""} // stringified value
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Main category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">Main Category</SelectItem>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.value}
                      value={category.value.toString()} // <- convert to string
                    >
                      {category.label}
                    </SelectItem>
                  ))}
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
