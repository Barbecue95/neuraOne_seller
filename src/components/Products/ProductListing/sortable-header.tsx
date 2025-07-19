"use client"

import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductSortOption } from "@/types/product.types";
import { useQueryParams } from "@/hooks/use-query-params";

interface SortOption {
  label: string;
  value: ProductSortOption;
}

interface SortableHeaderProps {
  title: string;
  sortOptions: SortOption[];
}

export const SortableHeader = ({ title, sortOptions }: SortableHeaderProps) => {
  const [open, setOpen] = useState(false);
  const { setParam, getParam } = useQueryParams();

  const handleSortChange = (value: ProductSortOption) => {
    setParam("sortBy", value);
    setOpen(false);
  };
  const isFilterUsed = sortOptions.some(
    (option) => option.value === (getParam("sortBy") as ProductSortOption),
  );
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Button
        asChild
        className={cn([
          "hover:text-primary h-auto bg-gray-200 font-medium hover:!bg-gray-200 hover:dark:!bg-neutral-800 dark:!bg-neutral-800",
          {
            "text-primary": isFilterUsed,
          },
        ])}
        variant="ghost"
      >
        <PopoverTrigger>
          {title}
          {!isFilterUsed ? (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpIcon
              className={cn("ml-2 h-4 w-4", {
                "rotate-180":
                  sortOptions.at(0)?.value ===
                  (getParam("sortBy") as ProductSortOption),
              })}
            />
          )}
        </PopoverTrigger>
      </Button>
      <PopoverContent align="start" className="w-56 rounded-lg p-1 shadow">
        {sortOptions.map((option, index) => (
          <button
            key={option.value}
            onClick={() => handleSortChange(option.value)}
            className={cn(
              "hover:bg-muted-foreground/5 hover:text-primary w-full rounded-md px-3 py-2 text-left text-sm",
              {
                "bg-muted-foreground/5 text-primary":
                  option.value === (getParam("sortBy") as ProductSortOption),
              },
            )}
          >
            {option.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
