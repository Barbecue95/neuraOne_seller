"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import ProductInfoSection from "./product-info-section";
import PhotoSection from "./photo-section";
import VisibilityInventorySection from "./visibility-inventory-section";
import OrganizationTagsSection from "./organization-tags-section";
import PricingSection from "./pricing-section";
import VariantSection from "./variant-section";
import RelatedProductsSection from "./related-products-section";

import {
  ProductStatus,
  TaxType,
  ProductRelationType,
  type CreateProductPayload,
} from "@/types/product.types";
import { CreateProductSchema } from "./product-form-schema";
import { useGetCategories } from "@/queries/category.queries";
import { useCreateProduct } from "@/queries/product.queries";
import { useRouter } from "next/navigation";

export default function CreateProductForm() {
  const router = useRouter();
  const [isDraftLoading, setIsDraftLoading] = useState(false);

  const { mutate: createProduct, isLoading: isCreating } = useCreateProduct();
  const form = useForm<CreateProductPayload>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: "",
      description: "",
      // brandId: null,
      mainCategoryId: 0,
      subCategoryId: null,
      subOneCategoryId: null,
      // tags: "",
      status: ProductStatus.PUBLISHED,
      scheduleDate: "",
      imageUrl: [],
      purchasePrice: 0,
      sellingPrice: 0,
      sku: "",
      // barcode: "",
      quantity: 0,
      weightUnit: "kg",
      weightValue: 0,
      taxStatus: false,
      // taxInfo: {
      //   taxType: TaxType.PERCENTAGE,
      //   taxAmount: 0,
      //   taxPercent: 0,
      // },
      promoteInfo: {
        isPromoted: false,
        discountType: "PERCENTAGE",
        discountValue: 0,
        startDate: "",
        endDate: "",
      },
      variantValues: [],
      variants: [],
      productRelationType: ProductRelationType.TAG,
    },
  });

  const { data: rawCategories } = useGetCategories();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const categories = rawCategories?.data?.map((category) => {
    return { value: category.id, label: category.name };
  });

  const [categoryVariantGroups, setCategoryVariantGroups] = useState();
  useEffect(() => {
    setCategoryVariantGroups(
      rawCategories?.data
        ?.filter((category) => category.id == selectedCategoryId)
        .map((category) => category?.categoryVariantGroups),
    );
  }, [selectedCategoryId]);

  console.log(
    "categoryVariantGroups",
    form.getValues("mainCategoryId"),
    categoryVariantGroups,
  );

  const handleSubmit = async (data: CreateProductPayload) => {
    createProduct(data);
    console.log("create product", data);
    router.push("/products")
  };

  const handleSaveAsDraft = async () => {
    const data = {
      ...form.getValues(),
      status: ProductStatus.DRAFT,
    };

    createProduct(data);
    console.log("create product", data);
    router.push("/products")
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Column */}
            <div className="space-y-6 lg:col-span-2">
              <ProductInfoSection
                form={form}
                categories={categories}
                setSelectedCategoryId={setSelectedCategoryId}
              />
              <PhotoSection form={form} />
              <PricingSection form={form} />
              <VariantSection
                form={form}
                categoryVariantGroups={categoryVariantGroups}
              />
              {/* <RelatedProductsSection form={form} /> */}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <VisibilityInventorySection form={form} />
              <OrganizationTagsSection form={form} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 border-t pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveAsDraft}
              disabled={isDraftLoading}
            >
              {isDraftLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save as draft"
              )}
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Product"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
