"use client";

import { ComingSoon } from "@/components/comingsoon";
import AddProductForm from "@/components/Products/CreateProduct/ProductInfo";
import ProductVariantPage from "@/components/Products/CreateProduct/ProductVariant";
import RelatedProductPage from "@/components/Products/CreateProduct/RelatedProduct";
import { useQueryParams } from "@/hooks/use-query-params";
import React from "react";

const ProductCreatePage = () => {
  const { getParam } = useQueryParams();
  const step = getParam("step");
  const renderBasedOnStep = () => {
    switch (step) {
      case "1":
        return <AddProductForm />;
      case "2":
        return <ProductVariantPage />;
      case "3":
        return <RelatedProductPage />;
      default:
        return <ComingSoon />;
    }
  };
  return <div>{renderBasedOnStep()}</div>;
};

export default ProductCreatePage;
