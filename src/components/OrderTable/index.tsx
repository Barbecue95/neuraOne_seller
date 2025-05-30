import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React from "react";
import { Orderdata } from "./dummy-data";
import { orderColumns } from "./columns";
import Search from "@/components/Navbar/Search";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { cn } from "@/lib/utils";

const OrderTable = () => {
  const table = useReactTable({
    data: Orderdata,
    columns: orderColumns as ColumnDef<(typeof Orderdata)[number]>[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });
  const currentRowCount =
    (table.getState().pagination.pageIndex + 1) *
    table.getState().pagination.pageSize;
  return (
    <div>
      <div className="mx-8 my-4 rounded-md border">
        <div className="flex flex-row items-center justify-between p-4">
          <h3>All Orders</h3>
          <Search
            className="bg-accent"
            btnClass="hover:bg-primary-foreground"
            placeholder="Search Order"
          />
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup, index) => (
              <TableRow key={headerGroup.id + index}>
                {headerGroup.headers.map((header, i) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={orderColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex w-full flex-row items-center justify-between px-8 pb-4">
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
      </div>
    </div>
  );
};

export default OrderTable;
