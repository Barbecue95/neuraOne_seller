"use client"

import { useState, useEffect, useCallback } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import ProductListHeader from "./product-list-header"
import ProductListFilters from "./product-list-filter"
import ProductTable from "./product-list-table"
import { PaginationInfo, Product } from "@/types/product.types"
import { getDummyProducts, getProductCategories } from "./dummy-data"

export interface ProductListProps {
  products?: Product[]
  onImport?: () => void
  onExport?: () => void
  onEditProduct?: (id: string) => void
  onDeleteProduct?: (id: string) => void
}

export default function ProductList({
  onImport,
  onExport,
  onEditProduct,
  onDeleteProduct,
}: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    size: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  })
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const categories = getProductCategories()

  // TODO: Need to bind with the api
  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 200))

      const result = getDummyProducts({
        page: pagination.page,
        size: pagination.size,
        searchText: debouncedSearchQuery,
        statusFilter,
        categoryFilter,
      })

      setProducts(result.data)
      setPagination(result.pagination)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }, [pagination.page, pagination.size, debouncedSearchQuery, statusFilter, categoryFilter])

  // TODO: Need to remove or change if api bind
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Reset to page 1 when filters change
  useEffect(() => {
    if (pagination.page !== 1) {
      setPagination((prev) => ({ ...prev, page: 1 }))
    }
  }, [debouncedSearchQuery, statusFilter, categoryFilter])

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }))
  }

  const handlePageSizeChange = (size: number) => {
    setPagination((prev) => ({ ...prev, size, page: 1 }))
  }

  const handleSortChange = (value: string) => {
    //TODO: Need to implement sorting logic here if needed
    console.log("Sort by:", value)
  }

  return (
    <div className="w-full space-y-4 bg-white">
      <ProductListHeader
        onImport={onImport}
        onExport={onExport}
        onSortChange={handleSortChange}
      />

      <ProductListFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        categories={categories}
      />

      <ProductTable
        data={products}
        pagination={pagination}
        onEditProduct={onEditProduct}
        onDeleteProduct={onDeleteProduct}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        loading={loading}
      />
    </div>
  )
}
