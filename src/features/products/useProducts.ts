import { getProductCategories } from "@/components/Products/ProductListing/dummy-data";
import { ProductTableColumns } from "@/components/Products/ProductListing/product-table-columns";
import { useDebounce } from "@/hooks/use-debounce";
import { useQueryParams } from "@/hooks/use-query-params";
import {
  useDeleteProducts,
  useGetProductListing,
} from "@/queries/product.queries";
import {
  PaginationInfo,
  Product,
  ProductSortOption,
} from "@/types/product.types";
import {
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

export default function useProducts() {
  // #region Define States
  const { getParam, setParam } = useQueryParams();
  const sortSearchParamValue = getParam("sortBy") as
    | ProductSortOption
    | undefined;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    size: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  // #endregion

  // #region Tanstack Query

  const { mutate: deleteProducts } = useDeleteProducts();

  // #endregion

  const [products, setProducts] = useState<Product[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data: rawProductList, isLoading: isLoadingProducts } =
    useGetProductListing({
      sort: sortSearchParamValue ?? ProductSortOption.NEWEST,
      page: pagination.page,
      limit: pagination.size,
      searchText: debouncedSearchQuery,
    });

  // #region Handle Events
  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handlePageSizeChange = (size: number) => {
    setPagination((prev) => ({ ...prev, size, page: 1 }));
  };

  const handleSortChange = (value: ProductSortOption) => {
    setParam("sortBy", value);
  };

  const onDeleteProduct = (id: number) => {
    deleteProducts([id]);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  // #endregion

  const columns = ProductTableColumns(onDeleteProduct);

  const table = useReactTable({
    data: products,
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

  const handleDeleteProducts = () => {
    const ids = Object.keys(rowSelection).map((key) => Number(key));
    deleteProducts(ids);
  };

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
        hasPrevPage: rawProductList.meta.page > 1,
        hasNextPage:
          Math.ceil(rawProductList.meta.total / rawProductList.meta.limit) >
          rawProductList.meta.page,
      });
    }
  }, [rawProductList]);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (pagination.page !== 1) {
      setPagination((prev) => ({ ...prev, page: 1 }));
    }
  }, [debouncedSearchQuery]);

  return {
    // Data
    pagination,
    table,
    columns,
    products,
    searchQuery,
    // Loading State
    isLoadingProducts,
    // functions
    handleSortChange,
    handlePageChange,
    handlePageSizeChange,
    handleSearchChange,
    handleDeleteProducts,
  };
}
