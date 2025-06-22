import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import ProductItem from "./ProductItem";
import { Input } from "@/components/ui/input";

export default function ProductSelect() {
  return (
    <div className="flex w-fit flex-col gap-4">
      <h2 className="scroll-m-20 px-5 text-2xl font-semibold tracking-tight">
        Products
      </h2>
      <RadioGroup defaultValue="Product" className="flex flex-row gap-2">
        <div className="flex flex-row items-center gap-2">
          <RadioGroupItem value="Product">Product</RadioGroupItem>
          <label className="">Product</label>
        </div>
        <div className="flex flex-row items-center gap-2">
          <RadioGroupItem value="Categor">Category</RadioGroupItem>
          <label className="">Category</label>
        </div>
      </RadioGroup>
      <RadioGroup defaultValue="SelectedProduct" className="gap-2">
        <div className="flex flex-row items-center gap-2">
          <RadioGroupItem value="AllProduct">All Products</RadioGroupItem>
          <label className="">All Products</label>
        </div>
        <div className="flex flex-row items-center gap-2">
          <RadioGroupItem value="SelectedProduct">
            Selected Products
          </RadioGroupItem>
          <label className="">Selected Products</label>
        </div>
      </RadioGroup>
      <div className="flex flex-row items-center gap-2">
        <Input placeholder="Search Product..." className="w-64" />
        <Button>Browse</Button>
      </div>
      <div className="flex w-full flex-col gap-2">
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </div>
  );
}
