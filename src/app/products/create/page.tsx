"use client";

import { ComingSoon } from "@/components/comingsoon";
import CreateProductForm from "@/components/Products/CreateProduct/ProductForm";
import AddProductForm from "@/components/Products/CreateProduct/ProductInfo";
import ProductVariantPage from "@/components/Products/CreateProduct/ProductVariant";
import RelatedProductPage from "@/components/Products/CreateProduct/RelatedProduct";
import { useQueryParams } from "@/hooks/use-query-params";
import React from "react";

const ProductCreatePage = () => {
  return <CreateProductForm />
};

export default ProductCreatePage;
