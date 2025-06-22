"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type VisibilityState,
  type SortingState,
} from "@tanstack/react-table";
import { CustomerTableColumns } from "./customer-table-columns";
import Pagination from "./pagination";
import type { PaginationInfo } from "@/types/product.types";
import TableWrapper from "./customer-table-wrapper";
import { User, UserSortOption } from "@/types/users.types";

interface CustomerTableProps {
  data: User[];
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  loading?: boolean;
  handleSortChange: (value: UserSortOption) => void;
  sortOptions: {
    label: string;
    value: UserSortOption;
  }[];
}

const CustomerTable = ({
  data,
  pagination,
  onPageChange,
  onPageSizeChange,
  loading = false,
  handleSortChange,
  sortOptions,
}: CustomerTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const columns = CustomerTableColumns(
    handleSortChange,
    sortOptions,
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    manualPagination: true,
    pageCount: pagination.totalPages,
  });

  return (
    <div className="space-y-4">
      <TableWrapper table={table} columns={columns} loading={loading} />
      <Pagination
        pagination={pagination}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

export default CustomerTable;
