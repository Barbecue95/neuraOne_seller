"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationInfo } from "@/types/product.types";

interface ProductPaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const ProductPagination = ({
  pagination,
  onPageChange,
  onPageSizeChange,
}: ProductPaginationProps) => {
  const { page, size, total, totalPages, hasNextPage, hasPrevPage } =
    pagination;
  // const startRow = (page - 1) * size + 1;
  // const endRow = Math.min(page * size, total);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (page + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex items-center justify-between pt-4">
      <div className="text-accent-foreground flex flex-row flex-nowrap items-center gap-2 text-base">
        <span>Showing</span>
        <Select
          value={size.toString()}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger
            disabledIcon
            className="!bg-primary h-8 w-16 rounded-xl text-white"
          >
            <SelectValue />
            <SelectIcon>
              <ChevronDown className="size-4 text-white" />
            </SelectIcon>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
        <span> of {total}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-fit rounded-3xl px-5 text-nowrap !text-black"
          asChild
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrevPage}
        >
          <button>
            <ChevronLeft className="ranslate-y-0.5 size-4" /> Prev
          </button>
        </Button>

        {getVisiblePages().map((pageNum, index) => (
          <div key={index}>
            {pageNum === "..." ? (
              <span className="text-accent-foreground px-2">...</span>
            ) : (
              <Button
                variant={page === pageNum ? "default" : "outline"}
                size="icon"
                className="hover:bg-primary aspect-square h-8 w-fit min-w-8 cursor-pointer rounded-full hover:text-white"
                onClick={() => onPageChange(pageNum as number)}
              >
                {pageNum}
              </Button>
            )}
          </div>
        ))}

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-fit items-center rounded-3xl px-5 !text-black"
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNextPage}
          asChild
        >
          <button>
            Next <ChevronRight className="size-4 translate-y-0.5" />
          </button>
        </Button>
      </div>
    </div>
  );
};

export default ProductPagination;
