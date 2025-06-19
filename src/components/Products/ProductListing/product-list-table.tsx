"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type VisibilityState,
  type SortingState,
} from "@tanstack/react-table";
import { ProductTableColumns } from "./product-table-columns";
import ProductPagination from "./product-list-pagination";
import type { Product, PaginationInfo } from "@/types/product.types";
import TableWrapper from "./product-table-wrapper";
import { useDeleteProduct } from "@/queries/product.queries";
import EditProductModal from "../CreateProduct/EditProductForm";

interface ProductTableProps {
  data: Product[];
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  loading?: boolean;
}

const ProductTable = ({
  data,
  pagination,
  onPageChange,
  onPageSizeChange,
  loading = false,
}: ProductTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { mutate: deleteProduct } = useDeleteProduct();
  const onDeleteProduct = (id: number) => {
    deleteProduct(id);
  };
  const onEditProduct = (id: number) => {
    setSelectedProductId(id);
  };
  const columns = ProductTableColumns(onEditProduct, onDeleteProduct);

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
      <ProductPagination
        pagination={pagination}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
      {selectedProductId && (
        <EditProductModal
          isOpen={selectedProductId ? true : false}
          onOpenChange={() => setSelectedProductId(null)}
          id={selectedProductId}
        />
      )}
    </div>
  );
};

export default ProductTable;
