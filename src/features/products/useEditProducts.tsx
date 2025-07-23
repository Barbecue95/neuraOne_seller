import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreateProductSchema,
  EditProductPayload,
} from "@/components/Products/CreateProduct/ProductForm/product-form-schema";
import {
  CategoryVariantGroup,
  ProductRelationType,
  ProductStatus,
  VariantCombination,
} from "@/types/product.types";
import { useGetCategories } from "@/queries/category.queries";
import {
  useCreateProduct,
  useGetProductById,
  useUpdateProduct,
} from "@/queries/product.queries";

export default function useEditProducts(id: number) {
  const router = useRouter();
  const { mutate: updateProduct, isLoading: isUpdating } = useUpdateProduct();
  const { data: rawProductData, isLoading: productLoading } =
    useGetProductById(id);
  const existingProduct = rawProductData?.data;

  const { data: rawCategories, isLoading: categoryLoading } = useGetCategories(
    {},
  );

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [categoryVariantGroups, setCategoryVariantGroups] = useState<
    CategoryVariantGroup[][]
  >([]);

  // Transform raw categories
  const categories =
    rawCategories?.data.map((c) => ({ value: c.id, label: c.name })) ?? [];

  const [existingVariants, setExistingVariants] = useState<
    VariantCombination[]
  >([]);

  const [isDuplicate, setIsDuplicate] = useState(false);

  const form = useForm({
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
      sizeUnit: "cm",
      sizeValue: "",
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

  const { reset, getValues } = form;

  const handleCategoryChange = (categoryId: number) =>
    setSelectedCategoryId(categoryId);

  const buildPayload = (data: EditProductPayload) => ({
    ...data,
    promoteInfo: {
      ...data.promoteInfo,
      promoteAmount:
        data.promoteInfo.discountType === "AMOUNT"
          ? data.promoteInfo.discountValue
          : 0,
      promotePercent:
        data.promoteInfo.discountType !== "AMOUNT"
          ? data.promoteInfo.discountValue
          : 0,
    },
  });

  const handleUpdateSubmit = (data: EditProductPayload) => {
    const payload = buildPayload(data);
    updateProduct(
      { id, payload },
      { onSuccess: () => router.push("/products") },
    );
  };

  const handleSaveAsDraft = () => {
    const values = getValues();
    const draftData: EditProductPayload = {
      ...values,
      status: ProductStatus.DRAFT,
    };
    const payload = buildPayload(draftData);
    updateProduct(
      { id, payload },
      { onSuccess: () => router.push("/products") },
    );
  };

  const handleDuplicate = () => {
    setIsDuplicate(true);
    // const data = form.getValues();
    // const payload = buildPayload(data);
    // console.log("Duplicate product", data, payload);
    // const id = createProduct(payload);

    // router.push("/products")
  };

  useEffect(() => {
    if (isDuplicate) {
      form.setValue("name", form.getValues("name") + " (Copy)");
      form.setValue("sku", "");
      const vs = form.getValues("variants") || [];
      const resetVars = vs.map((v) => ({ ...v, sku: "", quantity: 0 }));
      form.setValue("variants", resetVars);
      setExistingVariants((prev) => prev.map((v) => ({ ...v, sku: "" })));
    }
  }, [isDuplicate, form]);

  // Populate form with existing product data
  useEffect(() => {
    if (!existingProduct) return;
    reset({
      name: existingProduct.name,
      description: existingProduct.description,
      brandId: existingProduct.brandId ?? null,
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
      sizeUnit: existingProduct.sizeUnit ?? "cm",
      sizeValue: existingProduct.sizeValue ?? "",
      promoteInfo: {
        promoteStatus: existingProduct.promoteStatus,
        discountType: existingProduct.promoteAmount ? "AMOUNT" : "PERCENTAGE",
        discountValue:
          existingProduct.promoteAmount > 0
            ? existingProduct.promoteAmount
            : existingProduct.promotePercent,
        promoteAmount: existingProduct.promoteAmount ?? 0,
        promotePercent: existingProduct.promotePercent ?? 0,
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

    if (existingProduct?.mainCategoryId) {
      console.log("existing product", existingProduct, form.watch());

      setSelectedCategoryId(existingProduct.mainCategoryId);
    }
    if (existingProduct?.variants)
      setExistingVariants(existingProduct?.variants);
  }, [existingProduct, reset]);

  // Update variant groups when category changes
  useEffect(() => {
    if (!rawCategories?.data || !selectedCategoryId) return;
    const groups = rawCategories.data
      .filter((c) => c.id === selectedCategoryId)
      .map((c) => c.categoryVariantGroups);
    setCategoryVariantGroups(groups);
  }, [rawCategories, selectedCategoryId]);

  return {
    form,
    categories,
    categoryVariantGroups,
    existingVariants,
    isUpdating,
    productLoading,
    categoryLoading,
    selectedCategoryId,
    handleCategoryChange,
    handleUpdateSubmit,
    handleSaveAsDraft,
    isDuplicate,
    handleDuplicate,
  };
}
