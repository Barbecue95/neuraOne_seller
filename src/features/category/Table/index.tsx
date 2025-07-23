"use client";
import { ColumnDef, type Table } from "@tanstack/react-table";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination";
import { cn } from "@/lib/utils";
import AppTable from "@/components/AppTable";
import { Input } from "@/components/ui/input";
import { CategoryType, PaginationInfo } from "@/types/product.types";
import { SearchIcon } from "lucide-react";
import ProductPagination from "@/components/Products/ProductListing/product-list-pagination";

// Renamed to avoid conflict with TanStack Table type
const CategoryTable = ({
  table,
  columns,
  searchQuery,
  handleSearchChange,
  onPageChange,
  onPageSizeChange,
  pagination,
}: {
  table: Table<CategoryType>;
  columns: ColumnDef<CategoryType, any>[];
  searchQuery: string;
  handleSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pagination: PaginationInfo;
}) => {
  const currentRowCount =
    (table.getState().pagination.pageIndex + 1) *
    table.getState().pagination.pageSize;

  return (
    <div className="">
      <div className="bg-card my-4 rounded-3xl border">
        <div className="flex flex-row items-center justify-between p-4">
          <h2 className="scroll-m-20 text-xl font-medium tracking-tight">
            All Categories
          </h2>
          <div className="relative w-64">
            <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Search product"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="rounded-3xl pl-10"
            />
          </div>
        </div>
        <AppTable table={table} columns={columns} />
      </div>
      <ProductPagination
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        pagination={pagination}
      />
      {/* <div className="flex w-full flex-row items-center justify-between px-8 pb-4">
        <div className="flex flex-row items-center gap-2">
          <span className="text-nowrap">
            Result {table.getState().pagination.pageIndex + 1}&nbsp;-&nbsp;
            {currentRowCount > table.getRowCount()
              ? table.getRowCount()
              : currentRowCount}
            &nbsp;of&nbsp;
            {table.getRowCount()}
          </span>
          <Select
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="w-16">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent className="min-w-16">
              {[8, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Pagination className="justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => table.previousPage()}
                className={cn([
                  {
                    "pointer-events-none opacity-50":
                      !table.getCanPreviousPage(),
                  },
                ])}
              />
            </PaginationItem>
            {Array.from(
              {
                length:
                  table.getState().pagination.pageIndex + 3 <=
                  table.getPageCount()
                    ? 3
                    : table.getPageCount() -
                      table.getState().pagination.pageIndex,
              },
              (_, i) => table.getState().pagination.pageIndex + i + 1,
            ).map((page) => {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => table.setPageIndex(page - 1)}
                    isActive={
                      page === table.getState().pagination.pageIndex + 1
                    }
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            {table.getPageCount() > 6 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {table.getPageCount() > 6 &&
              Array.from(
                {
                  length:
                    table.getState().pagination.pageIndex >=
                    table.getPageCount() - 3
                      ? table.getPageCount() -
                        table.getState().pagination.pageIndex -
                        2
                      : 3,
                },
                (_, i) => {
                  return table.getPageCount() - i;
                },
              )
                .reverse()
                .map((page) => {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => table.setPageIndex(page - 1)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
            <PaginationItem>
              <PaginationNext
                onClick={() => table.nextPage()}
                className={cn([
                  { "pointer-events-none opacity-50": !table.getCanNextPage() },
                ])}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div> */}
    </div>
  );
};

export default CategoryTable;
