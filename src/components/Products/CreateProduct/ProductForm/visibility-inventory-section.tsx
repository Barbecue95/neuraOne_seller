"use client"

import type { UseFormReturn } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductStatus } from "@/types/product.types"
import { Calendar28 } from "./date-picker"
import { EditProductPayload } from "@/components/Products/CreateProduct/ProductForm/product-form-schema";

interface VisibilityInventorySectionProps {
  form: UseFormReturn<EditProductPayload>
}

export default function VisibilityInventorySection({ form }: VisibilityInventorySectionProps) {
  return (
    <div className="space-y-6">
      {/* Visibility */}
      <Card>
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
                  <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-row gap-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={ProductStatus.PUBLISHED} id="published" />
                      <Label htmlFor="published">Published</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={ProductStatus.SCHEDULED} id="scheduled" />
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
                      <Calendar28 onChange={field.onChange} formValue={field.value} />
                      {/* <Input type="date" placeholder="Date" {...field} />
                      <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" /> */}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </CardContent>
      </Card>

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
                    type="number"
                    placeholder="Stock"
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
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  SKU <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="SKU" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  )
}
