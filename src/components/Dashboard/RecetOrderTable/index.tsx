"use client";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import React from "react";
import { Orderdata } from "./dummy-data";
import { orderColumns } from "./columns";
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
import Link from "next/link";

const Table = () => {
  const table = useReactTable({
    data: Orderdata,
    columns: orderColumns as ColumnDef<(typeof Orderdata)[number]>[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });
  const currentRowCount =
    (table.getState().pagination.pageIndex + 1) *
    table.getState().pagination.pageSize;
  return (
    <div className="bg-card h-fit w-full rounded-[20px]">
      <div className="flex flex-row items-center justify-between p-5">
        <h2>Recent orders</h2>
        <Link href="/orders" className="text-primary">
          View all
        </Link>
      </div>
      {/* @ts-expect-error  table type cannot be inferred for all of table */}
      <AppTable table={table} columns={orderColumns} />
    </div>
  );
};

export default Table;
