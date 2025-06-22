"use client";

import ProductList from "@/components/Products/ProductListing";
import { useRouter } from "next/navigation";

const ProductPage = () => {
  const handleImport = () => {
    console.log("Import clicked");
  };

  const handleExport = () => {
    console.log("Export clicked");
  };

  const handleEditProduct = (id: string) => {
    console.log("Edit product:", id);
  };

  const handleDeleteProduct = (id: string) => {
    console.log("Delete product:", id);
  };

  return (
    <div className="container mx-auto p-6">
      <ProductList
        onImport={handleImport}
        onExport={handleExport}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};

export default ProductPage;
