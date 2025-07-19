"use client";

import { ColumnDef, RowModel, Table } from "@tanstack/react-table";
import ProductListFilters from "./product-list-filter";
import ProductTable from "./product-list-table";
import { PaginationInfo, Product } from "@/types/product.types";

interface ProductListProps {
  products: Product[] | undefined;
  hasSomeSelectedRows: boolean;
  columns: ColumnDef<Product>[];
  pagination: PaginationInfo;
  isLoadingProducts: boolean;
  table: Table<Product>;
  searchQuery: string;
  handleDeleteProducts: () => void;
  handleSearchChange: (value: string) => void;
}

export default function ProductList({
  hasSomeSelectedRows,
  isLoadingProducts,
  searchQuery,
  pagination,
  products,
  columns,
  table,
  handleSearchChange,
  handleDeleteProducts,
}: ProductListProps) {
  if (isLoadingProducts && !products)
    return (
      <div className="py-8 text-center text-gray-500">
        <p>Product list will be displayed here</p>
      </div>
    );

  return (
    <div className="bg-card w-full rounded-lg">
      <ProductListFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        hasSomeSelectedRows={hasSomeSelectedRows}
        handleDeleteProducts={handleDeleteProducts}
      />

      <ProductTable
        table={table}
        columns={columns}
        pagination={pagination}
        isLoading={isLoadingProducts}
      />
    </div>
  );
}
