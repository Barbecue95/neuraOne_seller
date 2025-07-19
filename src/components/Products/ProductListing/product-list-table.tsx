"use client";

import type { Product, PaginationInfo } from "@/types/product.types";
import TableWrapper from "./product-table-wrapper";
// import EditProductModal from "../CreateProduct/EditProductModal";
import { ColumnDef, Table } from "@tanstack/react-table";

interface ProductTableProps {
  table: Table<Product>;
  columns: ColumnDef<Product>[];
  pagination: PaginationInfo;
  isLoading?: boolean;
}

const ProductTable = ({
  table,
  columns,
  isLoading = false,
}: ProductTableProps) => {
  return (
    <div className="space-y-4">
      <TableWrapper table={table} columns={columns} loading={isLoading} />

      {/* {selectedProductId && (
        <EditProductModal
          isOpen={selectedProductId ? true : false}
          onOpenChange={() => handleCloseEditProductModal()}
          id={selectedProductId}
        />
      )} */}
    </div>
  );
};

export default ProductTable;
