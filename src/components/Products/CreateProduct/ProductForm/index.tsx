"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

import {
  ProductStatus,
  TaxType,
  ProductRelationType,
} from "@/types/product.types";
import {
  CreateProductPayload,
  CreateProductSchema,
} from "./product-form-schema";
import { useGetCategories } from "@/queries/category.queries";
import { useCreateProduct } from "@/queries/product.queries";
import { useRouter } from "next/navigation";
import Loading from "@/components/common/Loading";

export default function CreateProductForm() {
  const router = useRouter();
  const [isDraftLoading, setIsDraftLoading] = useState(false);

  const { mutate: createProduct, isLoading: isCreating } = useCreateProduct();
  const form = useForm<CreateProductPayload>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: "",
      description: "",
      brandId: null,
      mainCategoryId: 0,
      subCategoryId: null,
      subOneCategoryId: null,
      tags: "",
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
        discountType: "PERCENTAGE",
        discountValue: 0,
        promoteAmount: 0,
        promotePercent: 0,
        startDate: "",
        endDate: "",
      },
      variantValues: [],
      variants: [],
      productRelationType: ProductRelationType.TAG,
    },
  });

  const { data: rawCategories, isLoading: categoryLoading } = useGetCategories();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const categories = rawCategories?.data?.map(
    (category: { id: number; name: string }) => {
      return { value: category.id, label: category.name };
    },
  );

  const [categoryVariantGroups, setCategoryVariantGroups] = useState([]);

  useEffect(() => {
    setCategoryVariantGroups(
      rawCategories?.data
        ?.filter((category: any) => category.id == selectedCategoryId)
        .map((category: any) => category?.categoryVariantGroups),
    );
  }, [selectedCategoryId]);

  const handleSubmit = async (data: CreateProductPayload) => {
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
    console.log("create product", data, payload);
    createProduct(payload);
    router.back()
  };

  const handleSaveAsDraft = async () => {
    const data = {
      ...form.getValues(),
      status: ProductStatus.DRAFT,
    };

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
    }

    createProduct(payload);
    // console.log("create product", data);
    router.push("/products");
  };

  if(categoryLoading) return <Loading />;

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
            <Button
              type="submit"
              disabled={isCreating}
              className="active:scale-90"
            >
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
