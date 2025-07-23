// features/category/useCategory.tsx
"use client";
import {
  useGetCategories,
  useDeleteCategory,
} from "@/queries/category.queries";
import {
  categoryFormSchema,
  CategoryFormType,
  CategoryType,
  PaginationInfo,
  ProductSortOption,
} from "@/types/product.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { createCategoryColumns } from "./Table/colums";
import { useDebounce } from "@/hooks/use-debounce";
import { useQueryParams } from "@/hooks/use-query-params";
import { toast } from "sonner";

export default function useCategory() {
  const { getParam } = useQueryParams();
  const sortSearchParamValue = getParam("sortBy") as
    | ProductSortOption
    | undefined;

  const [CategoryDialog, setCategoryDialog] = useState<CategoryType | null>(
    null,
  );

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    size: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Delete confirmation dialog state
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    open: boolean;
    categoryId: number | null;
    categoryName: string;
  }>({ open: false, categoryId: null, categoryName: "" });

  const openDialog = useMemo(() => !!CategoryDialog, [CategoryDialog]);

  // Mutations
  const deleteCategoryMutation = useDeleteCategory();

  // Get Categories Data
  const {
    data: rawCategories,
    isLoading: categoryLoading,
    error: categoryError,
    refetch: refetchCategories,
  } = useGetCategories({
    sort: sortSearchParamValue ?? ProductSortOption.NEWEST,
    searchText: debouncedSearchQuery,
    page: pagination.page,
    limit: pagination.size,
  });

  const form = useForm<CategoryFormType>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      Description: "",
      status: "DRAFT",
      variantGroupIds: [],
    },
  });

  const handleAddCategory = () => {
    form.reset();
    setCategoryDialog({
      id: 0,
      name: "",
      Description: "",
      status: "DRAFT",
      productsCount: 0,
      children: [],
      categoryVariantGroups: [],
    });
  };

  const handleEditCategory = (id: number) => {
    const category = rawCategories?.data?.find((cat) => cat.id === id);
    if (category) {
      setCategoryDialog(category);
      // Set form values for editing
      form.reset({
        name: category.name,
        Description: category.Description,
        status: category.status,
        variantGroupIds:
          category.categoryVariantGroups?.map((vg) =>
            vg.variantGroup.id.toString(),
          ) || [],
      });
    }
  };

  // This function opens the confirmation dialog
  const handleDeleteCategory = (id: number) => {
    const category = rawCategories?.data?.find((cat) => cat.id === id);

    setDeleteConfirmation({
      open: true,
      categoryId: id,
      categoryName: category?.name || "Unknown",
    });
  };

  // This function actually performs the deletion
  const confirmDelete = async () => {
    if (!deleteConfirmation.categoryId) return;

    try {
      const response = await deleteCategoryMutation.mutateAsync(
        deleteConfirmation.categoryId,
      );

      if (response.status) {
        toast.success("Category deleted successfully!");
        refetchCategories();
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("An error occurred while deleting the category");
    } finally {
      setDeleteConfirmation({
        open: false,
        categoryId: null,
        categoryName: "",
      });
    }
  };

  // Function to close confirmation dialog without deleting
  const handleCloseDeleteDialog = () => {
    setDeleteConfirmation({ open: false, categoryId: null, categoryName: "" });
  };

  const columns = useMemo(
    () => createCategoryColumns(handleEditCategory, handleDeleteCategory),
    [handleEditCategory, handleDeleteCategory],
  );

  const table = useReactTable({
    data: rawCategories?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });

  const handleToggleDialog = () => {
    setCategoryDialog(null);
    form.reset();
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };
  const handleOnPageChange = (page: number) => {
    setPagination({
      page,
      size: pagination.size,
      total: pagination.total,
      totalPages: pagination.totalPages,
      hasNextPage: pagination.hasNextPage,
      hasPrevPage: pagination.hasPrevPage,
    });
  };
  const handleOnPageSizeChange = (size: number) => {
    setPagination({
      page: pagination.page,
      size,
      total: pagination.total,
      totalPages: pagination.totalPages,
      hasNextPage: pagination.hasNextPage,
      hasPrevPage: pagination.hasPrevPage,
    });
  };

  return {
    form,
    table,
    columns,
    openDialog,
    categoryLoading,
    categoryError,
    searchQuery,
    deleteConfirmation,
    deleteCategoryMutation,
    pagination,
    handleSearchChange,
    handleEditCategory,
    handleDeleteCategory,
    handleToggleDialog,
    handleAddCategory,
    confirmDelete,
    handleOnPageChange,
    handleOnPageSizeChange,
    handleCloseDeleteDialog,
  };
}
