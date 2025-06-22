"use client";

import EditProductForm from "@/components/Products/CreateProduct/EditProductForm";
import React, { use } from "react";

const ProductCreatePage = ({ params }: { params: Promise<{ id: string }>}) => {
  const { id } = use(params);
  const productId = parseInt(id);
  if (!productId) {
    return null;
  }
  return <EditProductForm id={productId} />;
};

export default ProductCreatePage;
