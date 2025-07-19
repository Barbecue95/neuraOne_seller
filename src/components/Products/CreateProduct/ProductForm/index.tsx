"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import ProductInfoSection from "./product-info-section";
import PhotoSection from "./photo-section";
import VisibilityInventorySection from "./visibility-inventory-section";
// import OrganizationTagsSection from "./organization-tags-section";
import PricingSection from "./pricing-section";
import VariantSection from "./variant-section";
import Loading from "@/components/common/Loading";
import useCreateProducts from "@/features/products/useCreateProducts";
import ProductHeader from "./product-Header";

export default function CreateProductForm() {
  const {
    categories,
    categoryVariantGroups,
    form,
    categoryLoading,
    isDraftLoading,
    isCreating,
    handleCategoryChange,
    handleCreateProductSubmit,
    handleSaveAsDraft,
  } = useCreateProducts();
  if (categoryLoading) return <Loading />;

  return (
    <div className="max-w-full space-y-6 px-8 py-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateProductSubmit)}
          className="space-y-6"
        >
          <ProductHeader />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Column */}
            <div className="space-y-6 lg:col-span-2">
              <ProductInfoSection
                form={form}
                categories={categories}
                setSelectedCategoryId={handleCategoryChange}
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
              {/* <OrganizationTagsSection form={form} /> */}
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
