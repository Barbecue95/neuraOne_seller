import { ProductRelationType, ProductStatus } from "@/types/product.types";
import { z } from "zod";
export const variantSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Variant name is required."),

  // ⬇︎ Coerce the string → number so validation actually runs
  purchasePrice: z.coerce
    .number({
      invalid_type_error: "purchase price must be a number.",
    })
    .nonnegative("purchase price cannot be negative."),

  sellingPrice: z.coerce
    .number({
      invalid_type_error: "selling price must be a number.",
    })
    .nonnegative("selling price cannot be negative."),

  quantity: z.coerce
    .number({
      invalid_type_error: "quantity must be an integer.",
    })
    .int("quantity must be a whole number.")
    .min(0, "quantity cannot be negative."),

  sku: z
    .string()
    .min(1, "Variant SKU is required.")
    .max(50, "Variant SKU must be 50 characters or less."),
});
export const CreateProductSchema = z
  .object({
    name: z
      .string()
      .min(1, "Product name is required.")
      .max(255, "Product name must be 255 characters or less."),
    description: z.string().min(1, "Product description is required."),
    brandId: z
      .number()
      .int("Brand ID must be an integer.")
      .positive("Brand ID must be a positive number.")
      .nullable()
      .optional(),
    mainCategoryId: z
      .number()
      .int("Main category ID must be an integer.")
      .min(1, "Main category is required."),
    subCategoryId: z
      .number()
      .int("Sub-category ID must be an integer.")
      .positive("Sub-category ID must be a positive number.")
      .nullable()
      .optional(),
    subOneCategoryId: z
      .number()
      .int("Sub-level 1 category ID must be an integer.")
      .positive("Sub-level 1 category ID must be a positive number.")
      .nullable()
      .optional(),
    tags: z.string().optional(),
    status: z.nativeEnum(ProductStatus, {
      errorMap: () => ({ message: "Please select a valid product status." }),
    }),
    scheduleDate: z
      .string()
      .datetime(
        "Invalid date format. Expected ISO 8601 datetime string " +
          "(e.g., '2023-10-27T10:00:00Z').",
      )
      .optional(),
    imageUrl: z
      .array(
        z.object({
          url: z
            .string()
            .url("Invalid image URL format.")
            .min(1, "Image URL cannot be empty."),
          isMain: z.boolean(),
        }),
      )
      .min(1, "At least one product image is required."),
    purchasePrice: z
      .number({ invalid_type_error: "Purchase price must be a number." })
      .nonnegative("Purchase price cannot be negative.")
      .min(0.01, "Purchase price must be greater than 0."),
    sellingPrice: z
      .number({ invalid_type_error: "Selling price must be a number." })
      .nonnegative("Selling price cannot be negative.")
      .min(0.01, "Selling price must be greater than 0."),
    sku: z
      .string()
      .min(1, "Product SKU is required.")
      .max(50, "Product SKU must be 50 characters or less."),
    quantity: z
      .number({ invalid_type_error: "Quantity must be an integer." })
      .int("Quantity must be a whole number.")
      .min(1, "Quantity must be at least 1."),
    weightUnit: z.string().optional(),
    weightValue: z
      .number({ invalid_type_error: "Weight value must be a number." })
      .nonnegative("Weight value cannot be negative.")
      .optional(),
    sizeUnit: z.string().optional(),
    sizeValue: z.string().optional(),
    promoteInfo: z.object({
      promoteStatus: z.boolean(),
      discountType: z
        .enum(["PERCENTAGE", "AMOUNT"], {
          errorMap: () => ({ message: "Please select a valid discount type." }),
        })
        .optional(),
      promoteAmount: z
        .number({ invalid_type_error: "Promote amount must be a number." })
        .nonnegative("Promote amount cannot be negative.")
        .optional(),
      promotePercent: z
        .number({ invalid_type_error: "Promote percentage must be a number." })
        .min(0, "Promote percentage cannot be negative.")
        .max(100, "Promote percentage cannot exceed 100%.")
        .optional(),
      discountValue: z
        .number({ invalid_type_error: "Discount value must be a number." })
        .nonnegative("Discount value cannot be negative.")
        .optional(),
      startDate: z.string().datetime("Invalid start date format.").optional(),
      endDate: z.string().datetime("Invalid end date format.").optional(),
    }),
    variantValues: z
      .array(
        z
          .number()
          .int("Variant value ID must be an integer.")
          .positive("Variant value ID must be a positive number."),
      )
      .optional()
      .nullable(),

    variants: z
      .array(variantSchema)
      .min(1, "At least one variant is required."),

    productRelationType: z.nativeEnum(ProductRelationType, {
      errorMap: () => ({
        message: "Please select a valid product relation type.",
      }),
    }),
  })
  // weight: if weightValue exists then weightUnit must exist
  .refine(
    (data) => {
      const hasValue = data.weightValue != null;
      const hasUnit = !!data.weightUnit;
      return !hasValue || hasUnit;
    },
    {
      message: "When specifying a weight value, you must also specify a unit.",
      path: ["weightValue"],
    },
  )
  // size: if sizeValue exists then sizeUnit must exist
  .refine(
    (data) => {
      const hasValue = data.sizeValue != null;
      const hasUnit = !!data.sizeUnit;
      return !hasValue || hasUnit;
    },
    {
      message: "When specifying a size value, you must also specify a unit.",
      path: ["sizeValue"],
    },
  );

export type CreateProductPayload = z.infer<typeof CreateProductSchema>;
export type EditProductPayload = z.infer<typeof CreateProductSchema>;
