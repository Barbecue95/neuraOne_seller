import {
  CreateProductPayload,
  CreateProductSchema,
} from "@/components/Products/CreateProduct/ProductForm/product-form-schema";
import { useGetCategories } from "@/queries/category.queries";
import { useCreateProduct } from "@/queries/product.queries";
import {
  CategoryVariantGroup,
  ProductRelationType,
  ProductStatus,
} from "@/types/product.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function useCreateProducts() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [isDraftLoading, setIsDraftLoading] = useState(false);
  const [categoryVariantGroups, setCategoryVariantGroups] = useState<
    CategoryVariantGroup[][]
  >([]);

  const router = useRouter();
  const { mutate: createProduct, isLoading: isCreating } = useCreateProduct();
  // #region Get Categories Data and Transform the data
  const { data: rawCategories, isLoading: categoryLoading } = useGetCategories(
    {},
  );

  const categories =
    rawCategories?.data?.map((category: { id?: number; name: string }) => {
      return { value: category.id ?? 0, label: category.name };
    }) ?? [];
  // #endregion

  const form = useForm({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: "",
      description: "",
      brandId: null,
      mainCategoryId: undefined,
      subCategoryId: null,
      subOneCategoryId: null,
      tags: "",
      status: ProductStatus.PUBLISHED,
      scheduleDate: new Date().toISOString(),
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
      },
      variantValues: [],
      variants: [],
      productRelationType: ProductRelationType.TAG,
    },
  });

  useEffect(() => {
    if (rawCategories?.data && selectedCategoryId) {
      setCategoryVariantGroups(
        rawCategories.data
          .filter((category) => category.id == selectedCategoryId)
          .map((category) => category.categoryVariantGroups),
      );
    }
  }, [selectedCategoryId]);

  const handleCategoryChange = (CategoryId: number) => {
    setSelectedCategoryId(CategoryId);
  };
  const handleCreateProductSubmit = async (data: CreateProductPayload) => {
    console.log("Create Product Data", data);

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
    createProduct(payload);
    router.push("/products");
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
    };

    createProduct(payload);
    router.push("/products");
  };

  return {
    // Data
    selectedCategoryId,
    categories,
    categoryVariantGroups,
    form,
    isCreating,
    isDraftLoading,
    categoryLoading,
    // Functions
    handleCreateProductSubmit,
    handleSaveAsDraft,
    handleCategoryChange,
  };
}
