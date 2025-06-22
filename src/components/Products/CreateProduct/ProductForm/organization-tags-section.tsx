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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditProductPayload } from "@/components/Products/CreateProduct/ProductForm/product-form-schema";

interface OrganizationTagsSectionProps {
  form: UseFormReturn<EditProductPayload>;
}

export default function OrganizationTagsSection({
  form,
}: OrganizationTagsSectionProps) {

  const weightUnits = [
    { value: "kg", label: "Kg" },
    { value: "g", label: "g" },
    { value: "lb", label: "lb" },
  ];

  return (
    <div className="space-y-6">
      {/* Product Organization */}
      <Card>
        <CardHeader>
          <CardTitle>Product Organization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-fit">
            <FormField
              control={form.control}
              name="weightValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Weight"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value === 0 ? '' : field.value ?? ''} 
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
                <FormItem className="absolute right-0 bottom-0 border-none">
                  {/* <FormLabel>Weight Unit</FormLabel> */}
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Kg" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {weightUnits.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
