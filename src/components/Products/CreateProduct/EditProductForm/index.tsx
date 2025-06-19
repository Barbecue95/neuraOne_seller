"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Edit, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import ProductInfoSection from "../ProductForm/product-info-section";
import PhotoSection from "../ProductForm/photo-section";
import VisibilityInventorySection from "../ProductForm/visibility-inventory-section";
import OrganizationTagsSection from "../ProductForm/organization-tags-section";
import PricingSection from "../ProductForm/pricing-section";
import VariantSection from "../ProductForm/variant-section";

import {
  ProductStatus,
  ProductRelationType,
  type CreateProductPayload,
} from "@/types/product.types";
import { CreateProductSchema } from "../ProductForm/product-form-schema";
import { useGetCategories } from "@/queries/category.queries";
import {
  useCreateProduct,
  useGetProductById,
  useUpdateProduct,
} from "@/queries/product.queries";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EditProductModal({
  id,
  isOpen,
  onOpenChange,
}: {
  id: number;
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  const router = useRouter();
  const [isDraftLoading, setIsDraftLoading] = useState(false);

  const { mutate: updateProduct, isLoading: isUpdating } = useUpdateProduct();
  const form = useForm<CreateProductPayload>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: "",
      description: "",
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
      taxStatus: false,
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

  const { reset } = form;
  const { data: rawProductData } = useGetProductById(id);
  const existingProduct = rawProductData?.data;
  console.log("existing", existingProduct);
  

  useEffect(() => {
    if (existingProduct) {
      reset({
        name: existingProduct.name,
        description: existingProduct.description,
        mainCategoryId: existingProduct.mainCategoryId,
        subCategoryId: existingProduct.subCategoryId,
        subOneCategoryId: existingProduct.subOneCategoryId,
        status: existingProduct.status as ProductStatus,
        scheduleDate: existingProduct.scheduleDate,
        imageUrl: existingProduct.images,
        purchasePrice: existingProduct.purchasePrice,
        sellingPrice: existingProduct.sellingPrice,
        sku: existingProduct.sku,
        quantity: existingProduct.quantity,
        weightUnit: existingProduct.weightUnit,
        weightValue: existingProduct.weightValue,
        taxStatus: existingProduct.taxStatus,
        promoteInfo: {
          isPromoted: false,
          discountType: existingProduct.promotePercent,
          discountValue: existingProduct.promoteAmount,
          startDate: existingProduct.promoteStartDate,
          endDate: existingProduct.promoteEndDate,
        },
        variantValues: existingProduct.variantValues,
        variants: existingProduct.variants,
        productRelationType:
          existingProduct.productRelationType as ProductRelationType,
      });
    }
  }, [existingProduct, reset]);

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
    updateProduct({payload: data, id});
    console.log("update product", data);
    router.push("/products");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-7xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Tabs defaultValue="info" className="mt-4 space-y-4">
              <TabsList>
                <TabsTrigger value="info">Info</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="variants">Variants</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="organization">Tags</TabsTrigger>
              </TabsList>

              <TabsContent value="info">
                <ProductInfoSection
                  form={form}
                  categories={categories}
                  setSelectedCategoryId={setSelectedCategoryId}
                />
              </TabsContent>

              <TabsContent value="photos">
                <PhotoSection form={form} />
              </TabsContent>

              <TabsContent value="pricing">
                <PricingSection form={form} />
              </TabsContent>

              <TabsContent value="variants">
                <VariantSection
                  form={form}
                  categoryVariantGroups={categoryVariantGroups}
                />
              </TabsContent>

              <TabsContent value="inventory">
                <VisibilityInventorySection form={form} />
              </TabsContent>

              <TabsContent value="organization">
                <OrganizationTagsSection form={form} />
              </TabsContent>
            </Tabs>
          </form>
        </Form>
        <DialogFooter>
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="submit" disabled={isUpdating}>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

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
