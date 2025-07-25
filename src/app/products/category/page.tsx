"use client";

import Table from "@/features/category/Table";
import CategoryHeader from "@/components/Category/Header";
import useCategory from "@/features/category/useCategory";
import CategoryContentDialog from "@/components/Category/DialogContent";
import DeleteConfirmationDialog from "@/components/common/AlertDialog";
import Loading from "@/components/common/Loading";
import { Dialog } from "@/components/ui/dialog";

export default function Home() {
  const {
    openDialog,
    form,
    table,
    columns,
    variants,
    searchQuery,
    variantForm,
    isSubmitting,
    categoryLoading,
    deleteConfirmation,
    deleteCategoryMutation,
    pagination,
    confirmDelete,
    handleAddCategory,
    handleCloseEditDialog,
    handleSearchChange,
    handleCloseDeleteDialog,
    handleOnPageChange,
    handleOnPageSizeChange,
    handleKeyDown,
    onSave,
  } = useCategory();

  // if (categoryLoading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-2 md:px-8 md:py-4">
      <CategoryHeader handleAddCategory={handleAddCategory} />

      <Table
        table={table}
        columns={columns}
        searchQuery={searchQuery}
        isLoading={categoryLoading}
        handleSearchChange={handleSearchChange}
        onPageChange={handleOnPageChange}
        onPageSizeChange={handleOnPageSizeChange}
        pagination={pagination}
      />

      {/* Category Add/Edit Dialog */}
      <Dialog open={openDialog} onOpenChange={handleCloseEditDialog}>
        <CategoryContentDialog
          form={form}
          variants={variants}
          variantForm={variantForm}
          isSubmitting={isSubmitting}
          onSave={onSave}
          handleKeyDown={handleKeyDown}
        />
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteConfirmation.open}
        onOpenChange={handleCloseDeleteDialog}
        onConfirm={confirmDelete}
        itemType="category"
        itemName={deleteConfirmation.categoryName}
        isLoading={deleteCategoryMutation.isLoading}
      />
    </div>
  );
}
