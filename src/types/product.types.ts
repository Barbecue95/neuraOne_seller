import { z } from "zod/v4";

export interface Product {
  id: number;
  name: string;
  quantity: number;
  sellingPrice: number;
  status: "PUBLISH" | "SCHEDULE" | "DRAFT";
  mainCategory: {
    id: number;
    name: string;
  };
}

export interface PaginationInfo {
  page: number;
  size: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ProductsResponse {
  data: Product[];
  pagination: PaginationInfo;
}

export interface GetDummyProductsParams {
  page: number;
  size: number;
  searchText?: string;
  statusFilter?: string;
  categoryFilter?: string;
}

export enum ProductStatus {
  PUBLISHED = "PUBLISH",
  SCHEDULED = "SCHEDULE",
  DRAFT = "DRAFT",
}

export enum TaxType {
  TAX_EXCLUSIVE = "TAX_EXCLUSIVE",
  TAX_INCLUDED = "TAX_INCLUDED",
}

export enum ProductRelationType {
  TAG = "TAG",
  BRAND = "BRAND",
  CATEGORY = "CATEGORY",
}

export interface ImageUrl {
  url: string;
  isMain: boolean;
}

export interface TaxInfo {
  taxType: TaxType;
  taxAmount?: number;
  taxPercent?: number;
}

export interface PromoteInfo {
  promoteStatus: boolean;
  discountType?: "PERCENTAGE" | "AMOUNT";
  discountValue?: number;
  promotePercent?: number;
  promoteAmount?: number;
  startDate?: string;
  endDate?: string;
}

// export interface ProductVariant {
//   id?: number;
//   name: string;
//   : number;
//   sellingPrice: number;
//   quantity: number;
//   sku: string;
//   // barcode?: string | null
//   // promoteInfo: PromoteInfo;
// }

export enum ProductSortOption {
  NEWEST = "newest",
  OLDEST = "oldest",
  PRICE_LOW_HIGH = "priceLowHigh",
  PRICE_HIGH_LOW = "priceHighLow",
  NAME_ASC = "nameAsc",
  NAME_DESC = "nameDesc",
  CATEGORY_ASC = "categoryAsc",
  CATEGORY_DESC = "categoryDesc",
  QUANTITY_LOW_HIGH = "quantityLowHigh",
  QUANTITY_HIGH_LOW = "quantityHighLow",
  STATUS_ASC = "statusAsc",
  STATUS_DESC = "statusDesc",
  PRODUCT_COUNT_ASC = "productCountAsc",
  PRODUCT_COUNT_DESC = "productCountDesc",
}

export interface metaType {
  limit: number;
  page: number;
  total: number;
}
export interface GetProductsParams {
  sort?: ProductSortOption;
  page?: number;
  limit?: number;
  searchText?: string;
}

export interface GetProductsResponse {
  status: boolean;
  message: string;
  data: Product[];
  meta: metaType;
}
// #region Category

export const categoryVariantGroupSchema = z.object({
  variantGroup: z.object({
    id: z.number(),
    name: z.string(),
    values: z.array(
      z.object({
        id: z.number(),
        value: z.string(),
      }),
    ),
  }),
});

export const categorySchema = z.object({
  id: z
    .number()
    .int({ error: "ID is not a number" })
    .nonnegative({ error: "ID must be a positive number" }),
  name: z.string().nonempty({ error: "Name is required" }).max(255, {
    error: "Name must be less than 255 characters",
  }),
  Description: z.string().optional(),
  status: z.enum(["PUBLISH", "DRAFT"]).optional(),
  productsCount: z.number().default(20),
  children: z.array(z.number()),
  categoryVariantGroups: z.array(categoryVariantGroupSchema),
});

export const getCategoriesResponseShema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.array(categorySchema),
  meta: z.object({
    limit: z.number(),
    page: z.number(),
    total: z.number(),
  }),
});

export type CategoryType = z.infer<typeof categorySchema>;
export type CategoryVariantGroup = z.infer<typeof categoryVariantGroupSchema>;
export type getCategoriesResponse = z.infer<typeof getCategoriesResponseShema>;

// #endregion
export interface GetProductByIdResponse {
  status: boolean;
  message: string;
  data: Product;
}

export interface VariantCombination {
  id: string;
  name: string;
  sku: string;
  purchasePrice: number;
  sellingPrice: number;
  quantity: number;
  combination?: { [key: string]: string };
  weightValue?: number;
  weightUnit?: string;
  sizeValue?: string;
  sizeUnit?: string;
}

export interface VariantValue {
  id: string;
  value: string;
}

export interface VariantOption {
  id: string;
  name: string;
  values: VariantValue[];
}

// #region Category Variant
export const VariantOptionCreateFormSchema = z.object({
  variantOptions: z
    .array(
      z.object({
        name: z.string().min(1, "Name is required"),
        variantValues: z
          .array(
            z.object({
              value: z.string().min(1, "Value is required"),
            }),
          )
          .min(1, "At least one value is required"),
      }),
    )
    .min(1, "At least one variant option is required"),
});
export const VariantOptionPayloadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  variantValues: z
    .array(
      z.object({
        value: z.string().min(1, "Value is required"),
      }),
    )
    .min(1, "At least one value is required"),
});
export const VariantOptionSchema = z.object({
  name: z.string(),
  variantValues: z.array(
    z.object({
      value: z.string(),
    }),
  ),
});

export const VariantOptionResponseSchema = z.object({
  status: z.boolean(),
  data: z.object({
    id: z.string(),
    name: z.string(),
    variantValues: z.array(
      z.object({
        id: z.string(),
        value: z.string(),
      }),
    ),
  }),

  message: z.string(),
});

export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(255, { message: "Name must be < 255 chars" }),
  Description: z.string().optional(),
  status: z.enum(["PUBLISH", "DRAFT"]).optional(),
  variantGroupIds: z.array(z.string()).optional(),
});

export const createCategoryResponseSchema = z.object({
  status: z.boolean(),
  data: categorySchema,
  message: z.string(),
});

export const createVariantsResponseSchema = z.object({
  status: z.boolean(),
  data: z.array(categoryVariantGroupSchema),
  message: z.string(),
});

export type VariantOptionCreateFormType = z.infer<
  typeof VariantOptionCreateFormSchema
>;
export type VariantOptionCreateResponse = z.infer<
  typeof createVariantsResponseSchema
>;
export type CreateCategoryResponse = z.infer<
  typeof createCategoryResponseSchema
>;
export type VariantOptionPayloadType = z.infer<
  typeof VariantOptionPayloadSchema
>;
export type VariantOptionResponseType = z.infer<
  typeof VariantOptionResponseSchema
>;

export type CategoryFormType = z.infer<typeof categoryFormSchema>;
export type VariantOptionType = z.infer<typeof VariantOptionSchema>;
