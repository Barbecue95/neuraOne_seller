"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { PaginationInfo } from "@/types/product.types";
import OrderListHeader from "./order-list-header";
import OrderListFilters from "./order-list-filter";
import OrderTable from "./order-list-table";
import { useQueryParams } from "@/hooks/use-query-params";
import { OrderSortOption } from "@/types/order.types";
import { getDummyOrderList } from "./dummy-data";

export interface OrderListProps {
  onImport?: () => void;
  onExport?: () => void;
}

export default function OrderList({ onImport, onExport }: OrderListProps) {
  const { getParam } = useQueryParams();
  const sortBy =
    (getParam("sortBy") as OrderSortOption) ?? OrderSortOption.NEWEST;
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    size: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // TODO 1: The Real API Query METHOD
  // const { data: rawOrderLists, isLoading: isLoadingOrderList } = useOrders({
  //   sort: sortBy,
  //   page: pagination.page,
  //   limit: pagination.size,
  //   searchText: debouncedSearchQuery,
  // });
  // const orderLists = rawOrderLists?.data ?? [];
  // END of TODO 1

  // TODO 2: This is dummmy data. Delete or comment if real data binding complete
  const isLoadingOrderList = false;
  const rawOrderLists = getDummyOrderList({
    page: pagination.page,
    size: pagination.size,
    // searchText: debouncedSearchQuery,
  });
  const orderLists = rawOrderLists?.data ?? [];
  // End of TODO 2

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

  if (isLoadingOrderList && !orderLists)
    return (
      <div className="py-8 text-center text-gray-500">
        <p>Order list will be displayed here</p>
      </div>
    );

  return (
    <div className="w-full">
      <OrderListHeader onImport={onImport} onExport={onExport} />

      <OrderListFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <OrderTable
        data={orderLists || []} // Ensure we always pass an array
        pagination={pagination}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        loading={isLoadingOrderList}
      />
    </div>
  );
}
