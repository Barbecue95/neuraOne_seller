"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import SortByButton from "@/utils/SortByButton";

export default function ProductListHeader() {
  return (
    <div className="flex items-center justify-between pb-4">
      <h1 className="text-2xl font-semibold">Product List</h1>
      <div className="flex items-center gap-2">
        <SortByButton />
        <Button size="sm" asChild className="rounded-full !p-5 !py-[18px]">
          <Link href="/products/create">
            <CirclePlusIcon className="h-6 w-6" /> Add Product
          </Link>
        </Button>
      </div>
    </div>
  );
}
