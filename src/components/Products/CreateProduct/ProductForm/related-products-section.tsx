"use client"

import type { UseFormReturn } from "react-hook-form"
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductRelationType } from "@/types/product.types"
import { CreateProductPayload } from "../ProductForm/product-form-schema"

interface RelatedProductsSectionProps {
  form: UseFormReturn<CreateProductPayload>
}

export default function RelatedProductsSection({ form }: RelatedProductsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggest or Related products</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select defaultValue="auto">
          <SelectTrigger>
            <SelectValue placeholder="Auto suggestion" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Auto suggestion</SelectItem>
            <SelectItem value="manual">Manual selection</SelectItem>
          </SelectContent>
        </Select>

        <FormField
          control={form.control}
          name="productRelationType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value={ProductRelationType.TAG} id="tag-relation" />
                    <Label htmlFor="tag-relation" className="flex-1">
                      Based on tag
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value={ProductRelationType.BRAND} id="brand-relation" />
                    <Label htmlFor="brand-relation" className="flex-1">
                      Based on brand
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value={ProductRelationType.CATEGORY} id="category-relation" />
                    <Label htmlFor="category-relation" className="flex-1">
                      Based on category
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
