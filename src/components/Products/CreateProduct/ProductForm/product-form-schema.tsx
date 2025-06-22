import { ProductRelationType, ProductStatus, TaxType } from "@/types/product.types";
import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string().min(1, "Product name is required").max(255, "Product name too long"),
  description: z.string().min(1, "Description is required"),
  brandId: z.number().nullable().optional(),
  mainCategoryId: z.number().min(1, "Category is required"),
  subCategoryId: z.number().nullable().optional(),
  subOneCategoryId: z.number().nullable().optional(),
  tags: z.string().optional(),
  status: z.nativeEnum(ProductStatus),
  scheduleDate: z.string().optional(),
  imageUrl: z.array(
    z.object({
      url: z.string(),
      isMain: z.boolean(),
    }),
  ),
  purchasePrice: z.number().min(0, "Purchase price must be positive"),
  sellingPrice: z.number().min(0, "Selling price must be positive"),
  sku: z.string().optional(),
  quantity: z.number().min(0, "Quantity must be positive"),
  weightUnit: z.string().optional(),
  weightValue: z.number().optional(),
  promoteInfo: z.object({
    promoteStatus: z.boolean(),
    discountType: z.enum(["PERCENTAGE", "AMOUNT"]).optional(),
    promoteAmount: z.number().optional(),
    promotePercent: z.number().optional(),
    discountValue: z.number().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
  variantValues: z.array(z.number()),
  variants: z.array(
    z.object({
      id: z.number().optional(),
      name: z.string(),
      purchasePrice: z.number(),
      sellingPrice: z.number(),
      quantity: z.number(),
      sku: z.string(),
    }),
  ),
  productRelationType: z.nativeEnum(ProductRelationType),
})
export type CreateProductPayload = z.infer<typeof CreateProductSchema>;
export type EditProductPayload = z.infer<typeof CreateProductSchema>;