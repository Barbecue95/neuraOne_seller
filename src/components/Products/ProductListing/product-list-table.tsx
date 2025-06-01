"use client"

import { useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type VisibilityState,
  type SortingState,
} from "@tanstack/react-table"
import { ProductTableColumns } from "./product-table-columns"
import ProductPagination from "./product-list-pagination"
import type { Product, PaginationInfo } from "@/types/product.types"
import TableWrapper from "./product-table-wrapper"

interface ProductTableProps {
  data: Product[]
  pagination: PaginationInfo
  onEditProduct?: (id: string) => void
  onDeleteProduct?: (id: string) => void
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  loading?: boolean
}

const ProductTable = ({
  data,
  pagination,
  onEditProduct,
  onDeleteProduct,
  onPageChange,
  onPageSizeChange,
  loading = false,
}: ProductTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const columns = ProductTableColumns(onEditProduct, onDeleteProduct)

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
  })

  return (
    <div className="space-y-4">
      <TableWrapper table={table} columns={columns} loading={loading} />
      <ProductPagination
        pagination={pagination}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  )
}

export default ProductTable
