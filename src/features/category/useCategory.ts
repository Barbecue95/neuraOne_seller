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
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { createCategoryColumns } from "./Table/colums";
import { useDebounce } from "@/hooks/use-debounce";
import { useQueryParams } from "@/hooks/use-query-params";
import { toast } from "sonner";
import useCategoryVariant from "./useCategoryVariant";

export default function useCategory() {
  const { getParam } = useQueryParams();
  const sortSearchParamValue = getParam("sortBy") as
    | ProductSortOption
    | undefined;

  const [CategoryDialog, setCategoryDialog] = useState<CategoryType | null>(
    null,
  );
  const [isEditing, setIsEditing] = useState(false);

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

  useEffect(() => {
    refetchCategories();
  }, [
    pagination.page,
    pagination.size,
    debouncedSearchQuery,
    sortSearchParamValue,
  ]);

  const form = useForm({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      status: false,
      variantGroupIds: [],
    },
  });

  const handleAddCategory = () => {
    form.reset();
    setCategoryDialog({
      id: 0,
      name: "",
      description: "",
      status: false,
      productsCount: 0,
      children: [],
      categoryVariantGroups: [],
    });
  };

  // This function opens the confirmation dialog
  const handleDeleteCategory = useCallback(
    (id: number) => {
      const category = rawCategories?.data?.find((cat) => cat.id === id);

      setDeleteConfirmation({
        open: true,
        categoryId: id,
        categoryName: category?.name || "Unknown",
      });
    },
    [rawCategories],
  );

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
  const handleCloseEditDialog = () => {
    setIsEditing(false);
    setCategoryDialog(null);
  };
  const {
    isSubmitting,
    form: variantForm,
    variants,
    onSave,
  } = useCategoryVariant({
    catForm: form,
    onClose: handleCloseEditDialog,
    isEditing,
  });

  const handleEditCategory = useCallback(
    (id: number) => {
      setIsEditing(true);
      const category = rawCategories?.data?.find((cat) => cat.id === id);
      if (category) {
        setCategoryDialog(category);
        // Set form values for editing
        form.reset({
          id: category?.id !== undefined ? category.id.toString() : "",
          name: category.name,
          description: category.description,
          status: category.status,
          variantGroupIds:
            category.categoryVariantGroups?.map((vg) =>
              vg.variantGroup.id.toString(),
            ) || [],
        });
        variantForm.reset({
          variantOptions:
            category.categoryVariantGroups?.map((vg) => ({
              id: vg.variantGroup.id.toString(),
              name: vg.variantGroup.name,
              variantValues: vg.variantGroup.values.map((v) => ({
                id: v.id.toString(),
                value: v.value,
              })),
            })) || [],
        });
      }
    },
    [rawCategories],
  );

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
        pageSize: pagination.size,
        pageIndex: pagination.page,
      },
    },
    manualPagination: true,
    pageCount: pagination.totalPages,
  });

  // Prevent Enter key from submitting forms
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };
  const handleOnPageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleOnPageSizeChange = (size: number) => {
    setPagination((prev) => ({
      ...prev,
      size,
      page: 1, // Reset to page 1 when page size changes
    }));
  };

  useEffect(() => {
    if (rawCategories && !categoryLoading) {
      setPagination({
        page: 1,
        size: pagination.size,
        total: rawCategories.meta.total,
        totalPages: Math.ceil(rawCategories.meta.total / pagination.size),
        hasNextPage:
          rawCategories.meta.total / pagination.size > pagination.page,
        hasPrevPage: pagination.page > 1,
      });
    }
  }, [rawCategories, categoryLoading]);

  useEffect(() => {
    if (pagination.page !== 1) {
      setPagination((prev) => ({ ...prev, page: 1 }));
    }
  }, [debouncedSearchQuery, pagination.size]);

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
    isSubmitting,
    variantForm,
    variants,
    onSave,
    confirmDelete,
    handleSearchChange,
    handleEditCategory,
    handleCloseEditDialog,
    handleAddCategory,
    handleOnPageChange,
    handleDeleteCategory,
    handleOnPageSizeChange,
    handleCloseDeleteDialog,
    handleKeyDown,
  };
}
