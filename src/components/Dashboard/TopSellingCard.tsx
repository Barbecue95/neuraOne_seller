import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { TopSellingProductType } from "@/types/dashboard.types";

export default function TopSellingCard({
  product,
}: {
  product: TopSellingProductType;
}) {
  return (
    <div className="bg-card flex items-center gap-4 py-2">
      <Avatar className="h-12 w-12 rounded-xl">
        <AvatarFallback className="rounded-xl">
          {product.productName}
        </AvatarFallback>
        <AvatarImage src={product.productImage ?? undefined} />
      </Avatar>
      <div className="flex flex-col gap-2">
        <h1 className="text-lg">{product.productName}</h1>
        <p className="text-primary">{product.productQuantity} sold</p>
      </div>
    </div>
  );
}
