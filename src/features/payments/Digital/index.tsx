import React from "react";
import Table from "./Table";
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { digitalColumns } from "./Table/columns";
import { CreateUpdatePaymentMethodPayload } from "@/types/payment-method.types";
import AppTable from "@/components/AppTable";
import { Skeleton } from "@/components/ui/skeleton"; // if using shadcn

type Props = {
  data: CreateUpdatePaymentMethodPayload[];
  isLoading: boolean;
  pagination: { total: number; page: number; limit: number };
};

const Digital = ({ data, isLoading, pagination }: Props) => {
  const table = useReactTable({
    data,
    columns: digitalColumns as ColumnDef<(typeof data)[number]>[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: pagination?.limit || 10,
      },
    },
  });

  const currentRowCount =
    (table.getState().pagination.pageIndex + 1) *
    table.getState().pagination.pageSize;

  if (isLoading) {
    return (
      <div className="mx-8 my-4 space-y-4">
        <Skeleton className="h-10 w-40" />
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mx-8 my-4 rounded-md border">
        {/* @ts-expect-error table type cannot be inferred */}
        <AppTable table={table} columns={digitalColumns} />
      </div>
      <div className="flex w-full flex-row items-center justify-between px-8 pb-4">
        <div className="flex flex-row items-center gap-2">
          <span className="text-nowrap">
            Result {table.getState().pagination.pageIndex + 1}&nbsp;-&nbsp;
            {currentRowCount > table?.getRowCount()
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
            ).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => table.setPageIndex(page - 1)}
                  isActive={page === table.getState().pagination.pageIndex + 1}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            {Array.from(
              {
                length:
                  table.getState().pagination.pageIndex >=
                  table.getPageCount() - 3
                    ? table.getPageCount() -
                      table.getState().pagination.pageIndex -
                      2
                    : 3,
              },
              (_, i) => table.getPageCount() - i,
            )
              .reverse()
              .map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink onClick={() => table.setPageIndex(page - 1)}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
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
      </div>
    </div>
  );
};

export default Digital;
