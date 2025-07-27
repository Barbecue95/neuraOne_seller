"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type VisibilityState,
  type SortingState,
} from "@tanstack/react-table";
import { OrderTableColumns } from "./order-table-columns";
import Pagination from "./pagination";
import type { PaginationInfo } from "@/types/product.types";
import TableWrapper from "./order-table-wrapper";
import { Order } from "@/types/order.types";
import { useRouter } from "next/navigation";

interface OrderTableProps {
  data: Order[];
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  loading?: boolean;
}

const OrderTable = ({
  data,
  pagination,
  onPageChange,
  onPageSizeChange,
  loading = false,
}: OrderTableProps) => {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns = OrderTableColumns();

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

  const goToDetail = (orderId: number) => {
    router.push(`/orders/${orderId}`);
  };

  return (
    <div className="space-y-4">
      <TableWrapper
        table={table}
        columns={columns}
        loading={loading}
        goToDetail={goToDetail}
      />
      <Pagination
        pagination={pagination}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

export default OrderTable;
