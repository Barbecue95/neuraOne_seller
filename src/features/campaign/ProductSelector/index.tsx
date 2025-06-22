import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import ProductItem from "./ProductItem";

export default function ProductSelector() {
  return (
    <div className="bg-accent flex flex-col gap-4 p-5">
      <div className="flex flex-col gap-5">
        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Products
        </h2>
        <RadioGroup defaultValue="Product" className="flex flex-row gap-2">
          <div className="flex flex-row gap-2">
            <RadioGroupItem value="Product">Product</RadioGroupItem>
            <Label>Product</Label>
          </div>
          <div className="flex flex-row gap-2">
            <RadioGroupItem value="Category">Category</RadioGroupItem>
            <Label>Category</Label>
          </div>
        </RadioGroup>
        <div className="flex w-1/2 flex-row gap-2">
          <Input placeholder="Search products" />
          <Button variant="outline">Browse</Button>
        </div>
        <div>
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </div>
      </div>
    </div>
  );
}
