"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderSortPeriodOption } from "@/types/order.types";
import { SortDescIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const sortOptions = [
  { value: OrderSortPeriodOption.TODAY, label: "Today" },
  { value: OrderSortPeriodOption.YESTERDAY, label: "Yesterday" },
  { value: OrderSortPeriodOption.WEEKLY, label: "Weekly" },
  { value: OrderSortPeriodOption.MONTHLY, label: "Monthly" },
];

export function SortDropdown() {
  const [selectedSort, setSelectedSort] = useState(OrderSortPeriodOption.TODAY);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortSelect = (value: OrderSortPeriodOption) => {
    setSelectedSort(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortByPeriod", value);
    router.replace(`?${params.toString()}`);
  };

  const selectedLabel =
    sortOptions.find((option) => option.value === selectedSort)?.label ||
    "A to Z";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-auto cursor-pointer rounded-full bg-[#E4E6FF] px-4 py-2 text-lg font-medium text-[#303030] dark:bg-gray-900 dark:text-white"
        >
          <SortDescIcon className="size-5 mt-1 scale-x-[-1]" />
          Sort by: {selectedLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-44 rounded-[10px] border bg-white p-0 shadow-lg dark:bg-gray-700"
      >
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleSortSelect(option.value)}
            className={`cursor-pointer px-3 py-2 text-sm text-[#303030] dark:text-white ${
              selectedSort === option.value
                ? "bg-[#E4E6FF] font-medium dark:bg-gray-700"
                : "hover:bg-[#E4E6FF] hover:dark:bg-gray-800"
            }`}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
