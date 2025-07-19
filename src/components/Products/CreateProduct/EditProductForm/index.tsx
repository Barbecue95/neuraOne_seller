"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import ProductInfoSection from "../ProductForm/product-info-section";
import PhotoSection from "../ProductForm/photo-section";
import VisibilityInventorySection from "../ProductForm/visibility-inventory-section";
import PricingSection from "../ProductForm/pricing-section";

// import EditVariantSection from "./edit-variant-section";
import Loading from "@/components/common/Loading";
import ProductHeader from "../ProductForm/product-Header";
import useEditProducts from "@/features/products/useEditProducts";
import VariantSection from "../ProductForm/variant-section";

export default function EditProductForm({ id }: { id: number }) {
  const {
    form,
    categories,
    isUpdating,
    isDuplicate,
    productLoading,
    categoryLoading,
    existingVariants,
    categoryVariantGroups,
    handleCategoryChange,
    handleUpdateSubmit,
    handleSaveAsDraft,
    handleDuplicate,
  } = useEditProducts(id);

  if (productLoading || categoryLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-full space-y-6 p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateSubmit)}
          className="space-y-6"
        >
          <ProductHeader
            isEdit
            title="Edit Product"
            handleDuplicate={handleDuplicate}
          />
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
              {/* <EditVariantSection
                form={form}
                existingVariants={existingVariants}
              /> */}
              <VariantSection
                form={form}
                categoryVariantGroups={categoryVariantGroups}
                existingVariants={existingVariants}
                isDuplicate={isDuplicate}
              />
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
              variant="secondary"
              onClick={handleSaveAsDraft}
              className="rounded-full bg-[#A1A1A1] text-white transition-colors duration-300 hover:bg-[#A1A1A1b5] active:scale-90"
            >
              Save as draft
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              className={"rounded-full active:scale-90"}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
