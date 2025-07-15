"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { PaginationInfo } from "@/types/product.types";
import { getProductCategories } from "./dummy-data";
import { User, UserSortOption } from "@/types/users.types";
import { useUsers } from "@/queries/users.queries";
import CustomerListHeader from "./customer-list-header";
import CustomerListFilters from "./customer-list-filter";
import CustomerTable from "./customer-list-table";

const sortOptions = [
  { label: "Name (A-Z)", value: UserSortOption.NAME_ASC },
  { label: "Name (Z-A)", value: UserSortOption.NAME_DESC },
  { label: "Phone (Asc)", value: UserSortOption.PHONE_ASC },
  { label: "Phone (Desc)", value: UserSortOption.PHONE_DESC },
  { label: "Email (A-Z)", value: UserSortOption.EMAIL_ASC },
  { label: "Email (Z-A)", value: UserSortOption.EMAIL_DESC },
  { label: "Total Orders (Asc)", value: UserSortOption.TOTAL_ORDER_COUNT_ASC },
  { label: "Total Orders (Desc)", value: UserSortOption.TOTAL_ORDER_COUNT_DESC },
  { label: "Total Spend (Asc)", value: UserSortOption.TOTAL_ORDER_AMOUNT_ASC },
  { label: "Total Spend (Desc)", value: UserSortOption.TOTAL_ORDER_AMOUNT_DESC },
  { label: "Newest", value: UserSortOption.NEWEST },
  { label: "Oldest", value: UserSortOption.OLDEST },
]
export interface CustomerListProps {
  products?: User[];
  onImport?: () => void;
  onExport?: () => void;
}

export default function CustomerList({
  onImport,
  onExport,
}: CustomerListProps) {
  const [customerLists, setCustomerLists] = useState<User[]>([]);
  const [sorting, setSorting] = useState<UserSortOption>(UserSortOption.NEWEST);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    size: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const categories = getProductCategories();

  const {
    data: rawCustomerLists,
    isLoading: isLoadingCustomer,
  } = useUsers({
    sort: sorting,
    page: pagination.page,
    limit: pagination.size,
    searchText: debouncedSearchQuery,
  });

  useEffect(() => {
    if (rawCustomerLists?.data) {
      setCustomerLists(
        Array.isArray(rawCustomerLists.data) ? rawCustomerLists.data : []
      );
      setPagination({
        ...pagination,
        total: rawCustomerLists?.meta?.total || 0,
        totalPages: Math.ceil((rawCustomerLists?.meta?.total || 0) / pagination.size),
      });
    }
  }, [rawCustomerLists]);

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

  const handleSortChange = (value: UserSortOption) => {
    setSorting(value);
    console.log("Sort by:", value);
  };

  if (isLoadingCustomer && !customerLists)
    return (
      <div className="py-8 text-center text-gray-500">
        <p>Customer list will be displayed here</p>
      </div>
    );

  return (
    <div className="w-full space-y-4 bg-white">
      <CustomerListHeader
        onImport={onImport}
        onExport={onExport}
      />

      <CustomerListFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        categories={categories}
      />

      <CustomerTable
        data={customerLists || []} // Ensure we always pass an array
        pagination={pagination}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        loading={isLoadingCustomer}
        sortOptions={sortOptions}
        handleSortChange={handleSortChange}
      />
    </div>
  );
}
