"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import ProductInfoSection from "../ProductForm/product-info-section";
import PhotoSection from "../ProductForm/photo-section";
import VisibilityInventorySection from "../ProductForm/visibility-inventory-section";
import OrganizationTagsSection from "../ProductForm/organization-tags-section";
import PricingSection from "../ProductForm/pricing-section";

import { ProductStatus, ProductRelationType } from "@/types/product.types";
import {
  CreateProductSchema,
  EditProductPayload,
} from "../ProductForm/product-form-schema";
import { useGetCategories } from "@/queries/category.queries";
import { useGetProductById, useUpdateProduct } from "@/queries/product.queries";
import EditVariantSection, { VariantCombination } from "./edit-variant-section";
import Loading from "@/components/common/Loading";
import { useRouter } from "next/navigation";

export default function EditProductForm({ id }: { id: number }) {
  const router = useRouter();
  const { mutate: updateProduct, isLoading: isUpdating } = useUpdateProduct();
  const form = useForm<EditProductPayload>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: "",
      description: "",
      brandId: null,
      mainCategoryId: 0,
      subCategoryId: null,
      subOneCategoryId: null,
      status: ProductStatus.PUBLISHED,
      scheduleDate: "",
      imageUrl: [],
      purchasePrice: 0,
      sellingPrice: 0,
      sku: "",
      quantity: 0,
      weightUnit: "kg",
      weightValue: 0,
      promoteInfo: {
        promoteStatus: false,
        promoteAmount: 0,
        promotePercent: 0,
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

  const { reset } = form;
  const { data: rawProductData, isLoading } = useGetProductById(id);
  const existingProduct = rawProductData?.data;

  useEffect(() => {
    if (existingProduct) {
      reset({
        name: existingProduct.name,
        description: existingProduct.description,
        brandId: existingProduct?.brandId ?? null,
        mainCategoryId: existingProduct.mainCategoryId,
        subCategoryId: existingProduct.subCategoryId ?? null,
        subOneCategoryId: existingProduct.subOneCategoryId ?? null,
        status:
          (existingProduct.status as ProductStatus) ?? ProductStatus.PUBLISHED,
        scheduleDate: existingProduct.scheduleDate ?? "",
        imageUrl: existingProduct.images ?? [],
        purchasePrice: parseInt(existingProduct.purchasePrice) ?? 0,
        sellingPrice: parseInt(existingProduct.sellingPrice) ?? 0,
        sku: existingProduct.sku ?? "",
        quantity: existingProduct.quantity ?? 0,
        weightUnit: existingProduct.weightUnit ?? "kg",
        weightValue: existingProduct.weightValue ?? 0,
        promoteInfo: {
          promoteStatus: existingProduct.promoteStatus,
          discountType: existingProduct.promoteAmount ? "AMOUNT" : "PERCENTAGE",
          discountValue:
            existingProduct.promoteAmount > 0
              ? existingProduct.promoteAmount
              : existingProduct.promotePercent,
          startDate: existingProduct.promoteStartDate ?? "",
          endDate: existingProduct.promoteEndDate ?? "",
        },
        variantValues: existingProduct.variantValues
          ? existingProduct.variantValues.map(
              (value: any) => value.variantValueId,
            )
          : [],
        variants: existingProduct.variants ?? [],
        productRelationType:
          (existingProduct.productRelationType as ProductRelationType) ??
          ProductRelationType.TAG,
      });
    }
  }, [existingProduct, reset]);

  const { data: rawCategories, isLoading: categoryLoading } =
    useGetCategories();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const categories = rawCategories?.data?.map((category: any) => {
    return { value: category.id, label: category.name };
  });

  const [categoryVariantGroups, setCategoryVariantGroups] = useState();
  useEffect(() => {
    setCategoryVariantGroups(
      rawCategories?.data
        ?.filter((category: any) => category.id == selectedCategoryId)
        .map((category: any) => category?.categoryVariantGroups),
    );
  }, [selectedCategoryId]);

  const [existingVariants, setExistingVariants] = useState<
    VariantCombination[]
  >([]);

  useEffect(() => {
    if (!existingProduct?.variants) return;

    const transformed = existingProduct.variants.map((variant: any) => ({
      id: variant?.id?.toString(),
      name: variant?.name,
      sku: variant?.sku,
      purchasePrice: variant?.purchasePrice,
      sellingPrice: variant?.sellingPrice,
      quantity: variant?.quantity,
    }));

    setExistingVariants(transformed);
  }, [existingProduct]);

  const handleSubmit = async (data: EditProductPayload) => {
    const payload = {
      ...data,
      promoteInfo: {
        ...data.promoteInfo,
        promoteAmount:
          data.promoteInfo?.discountType === "AMOUNT"
            ? data.promoteInfo.discountValue
            : 0,
        promotePercent:
          data.promoteInfo?.discountType != "AMOUNT"
            ? data.promoteInfo.discountValue
            : 0,
      },
    };
    // console.log("update product", data);
    console.log("payload", payload);
    updateProduct({ payload, id });
    router.back();
  };

  if (isLoading || categoryLoading) {
    return <Loading />;
  }

  console.log("error", form.watch());

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
              <EditVariantSection
                form={form}
                existingVariants={existingVariants}
              />
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
              type="submit"
              disabled={isUpdating}
              className={"active:scale-90"}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Product"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
