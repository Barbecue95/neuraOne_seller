"use client";

import DeleteConfirmationDialog from "@/components/common/AlertDialog";
import ProductList from "@/components/Products/ProductListing";
import ProductListHeader from "@/components/Products/ProductListing/product-list-header";
import ProductPagination from "@/components/Products/ProductListing/product-list-pagination";
import useProducts from "@/features/products/useProducts";

const ProductPage = () => {
  const {
    pagination,
    products,
    table,
    columns,
    searchQuery,
    deleteProducts,
    isLoadingProducts,
    deleteConfirmation,
    handleCloseDeleteDialog,
    confirmDelete,
    handlePageChange,
    handleSearchChange,
    handlePageSizeChange,
    handleDeleteProducts,
  } = useProducts();

  return (
    <div className="container mx-auto px-4 py-2 md:px-8 md:py-4">
      <ProductListHeader />
      <ProductList
        table={table}
        columns={columns}
        products={products}
        pagination={pagination}
        isLoadingProducts={isLoadingProducts}
        hasSomeSelectedRows={
          table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()
        }
        // Search
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        // Delete
        handleDeleteProducts={handleDeleteProducts}
      />
      <DeleteConfirmationDialog
        onConfirm={confirmDelete}
        itemType="product"
        onOpenChange={handleCloseDeleteDialog}
        itemName={deleteConfirmation.productName}
        isLoading={deleteProducts.isLoading}
        open={deleteConfirmation.open}
      />
      <ProductPagination
        pagination={pagination}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default ProductPage;
