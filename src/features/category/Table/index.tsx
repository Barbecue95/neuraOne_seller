"use client";
import { ColumnDef, type Table } from "@tanstack/react-table";
import React from "react";
import AppTable from "@/components/AppTable";
import { Input } from "@/components/ui/input";
import { CategoryType, PaginationInfo } from "@/types/product.types";
import { SearchIcon } from "lucide-react";
import ProductPagination from "@/components/Products/ProductListing/product-list-pagination";

// Renamed to avoid conflict with TanStack Table type
const CategoryTable = ({
  table,
  columns,
  isLoading,
  pagination,
  searchQuery,
  handleSearchChange,
  onPageChange,
  onPageSizeChange,
}: {
  table: Table<CategoryType>;
  columns: ColumnDef<CategoryType, any>[];
  searchQuery: string;
  pagination: PaginationInfo;
  isLoading?: boolean;
  handleSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}) => {
  return (
    <div className="">
      <div className="bg-card my-4 rounded-3xl border pb-6 md:pb-0">
        <div className="flex flex-row items-center justify-between p-4">
          <h2 className="scroll-m-20 text-base font-medium tracking-tight md:text-xl">
            All Categories
          </h2>
          <div className="relative w-40 md:w-64">
            <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Search product"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="rounded-3xl pl-10 text-sm md:text-base"
            />
          </div>
        </div>
        <AppTable table={table} columns={columns} loading={isLoading} />
      </div>
      <ProductPagination
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        pagination={pagination}
      />
    </div>
  );
};

export default CategoryTable;
