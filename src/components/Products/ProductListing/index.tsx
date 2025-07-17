"use client";

import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import ProductListHeader from "./product-list-header";
import ProductListFilters from "./product-list-filter";
import ProductTable from "./product-list-table";
import {
  PaginationInfo,
  Product,
  ProductSortOption,
} from "@/types/product.types";
import { getDummyProducts, getProductCategories } from "./dummy-data";
import { useGetProductListing } from "@/queries/product.queries";
import { useQueryParams } from "@/hooks/use-query-params";

export interface ProductListProps {
  products?: Product[];
  onImport?: () => void;
  onExport?: () => void;
  onEditProduct?: (id: string) => void;
  onDeleteProduct?: (id: string) => void;
}

export default function ProductList({
  onImport,
  onExport,
  onEditProduct,
  onDeleteProduct,
}: ProductListProps) {
  const { getParam } = useQueryParams();
  const sortBy =
    (getParam("sortBy") as ProductSortOption) ?? ProductSortOption.NEWEST;
  const [products, setProducts] = useState<Product[]>([]);
  // const [sorting, setSorting] = useState<ProductSortOption>(
  //   sortBy as ProductSortOption ?? ProductSortOption.NEWEST,
  // );
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    size: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const categories = getProductCategories();

  const {
    data: rawProductList,
    isLoading: isLoadingProducts,
    refetch: refetchProductList,
  } = useGetProductListing({
    sort: sortBy,
    page: pagination.page,
    limit: pagination.size,
    searchText: debouncedSearchQuery,
  });

  useEffect(() => {
    if (rawProductList?.data) {
      setProducts(
        Array.isArray(rawProductList.data) ? rawProductList.data : [],
      );
      setPagination({
        ...pagination,
        total: rawProductList?.meta?.total || 0,
        totalPages: Math.ceil(
          (rawProductList?.meta?.total || 0) / pagination.size,
        ),
      });
    }
  }, [rawProductList]);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (pagination.page !== 1) {
      setPagination((prev) => ({ ...prev, page: 1 }));
    }
  }, [debouncedSearchQuery]);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handlePageSizeChange = (size: number) => {
    setPagination((prev) => ({ ...prev, size, page: 1 }));
  };

  const handleSortChange = (value: string) => {
    //TODO: Need to implement sorting logic here if needed
    console.log("Sort by:", value);
  };

  if (isLoadingProducts && !products)
    return (
      <div className="py-8 text-center text-gray-500">
        <p>Product list will be displayed here</p>
      </div>
    );

  return (
    <div className="w-full space-y-4">
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
        // onEditProduct={onEditProduct}
        // onDeleteProduct={onDeleteProduct}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        loading={loading}
      />
    </div>
  );
}
