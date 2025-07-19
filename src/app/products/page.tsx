"use client";

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
    isLoadingProducts,
    handlePageChange,
    handleSearchChange,
    handlePageSizeChange,
    handleDeleteProducts,
  } = useProducts();

  return (
    <div className="container mx-auto px-8 py-4">
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

      <ProductPagination
        pagination={pagination}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default ProductPage;
