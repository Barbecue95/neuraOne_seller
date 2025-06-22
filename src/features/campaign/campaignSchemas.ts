import { z } from "zod/v4";

export const campaignSchema = z
  .object({
    id: z.number(),
    name: z.string().min(1, { message: "Campaign name is required" }),
    description: z
      .string()
      .min(1, { message: "Campaign description is required" }),
    banner: z.string().min(1, { message: "Campaign banner is required" }),
    startDate: z.date(),
    endDate: z.date(),
    discount: z
      .string()
      .min(1, {
        message: "Discount must be at least 1 character",
      })
      .regex(/^\d+$/, {
        message: "Must be a string containing numbers only",
      }),
    discountUnit: z.enum(["percentage", "amount"]),
  })
  .refine(
    (data) => data.discountUnit !== "percentage" || Number(data.discount) <= 99,
    {
      error: "For percentage discounts, the value must be at most 2",
      path: ["discount"],
    },
  );

export const flashSaleSchema = z
  .object({
    id: z.number(),
    name: z.string().min(1, { message: "Campaign name is required" }),
    description: z
      .string()
      .min(1, { message: "Campaign description is required" }),
    banner: z.string().min(1, { message: "Campaign banner is required" }),
    startDate: z.date(),
    endDate: z.date(),
    discount: z.string().regex(/^\d+$/, {
      message: "Must be a string containing numbers only",
    }),
    discountUnit: z.enum(["percentage", "amount"]),
    minimumAmount: z.string().regex(/^\d+$/, {
      message: "Must be a string containing numbers only",
    }),
  })
  .refine(
    (data) => data.discountUnit !== "percentage" || Number(data.discount) <= 99,
    {
      error: "For percentage discounts, the value must be at most 2",
      path: ["discount"],
    },
  );
export const buyXGetYFreeSchema = z
  .object({
    id: z.number(),
    name: z.string().min(1, { message: "Campaign name is required" }),
    description: z
      .string()
      .min(1, { message: "Campaign description is required" }),
    banner: z.string().min(1, { message: "Campaign banner is required" }),
    startDate: z.date(),
    endDate: z.date(),
    discount: z.string().regex(/^\d+$/, {
      message: "Must be a string containing numbers only",
    }),
    discountUnit: z.enum(["percentage", "amount"]),
    buyingType: z.enum(["items", "amount"]),
    gettingType: z.enum(["percentage", "free"]),
    minimumAmount: z.string().regex(/^\d+$/, {
      message: "Must be a string containing numbers only",
    }),
    buyXProducts: z.string(),
    getYProducts: z.string(),
  })
  .refine(
    (data) => data.discountUnit !== "percentage" || Number(data.discount) <= 99,
    {
      error: "For percentage discounts, the value must be at most 2",
      path: ["discount"],
    },
  )
  .refine(
    (data) =>
      data.buyingType === "items"
        ? data.buyXProducts.length > 0
        : data.buyXProducts.length <= data.getYProducts.length,
    {
      error:
        "Buy X must be greater than 0 and Get Y must be less than or equal to Buy X",
      path: ["buyXProducts", "getYProducts"],
    },
  );

export const couponCodeSchema = z
  .object({
    id: z.number(),
    couponCode: z
      .string()
      .max(20, { message: "Coupon code must be last then 20 characters" }),
    expiredDate: z.nullable(z.date()),
    limit: z.nullable(
      z.string().regex(/^\d+$/, {
        message: "Must be a string containing numbers only",
      }),
    ),
    discount: z
      .string()
      .regex(/^\d+$/, {
        message: "Must be a string containing numbers only",
      })
      .min(1, { message: "Discount must be at least 1 character" })
      .max(20, { message: "Discount must be last then 20 characters" }),
    discountUnit: z.enum(["percentage", "amount"]),
    status: z.enum(["Public", "Private"]),
    minimumAmount: z.string().regex(/^\d+$/, {
      message: "Must be a string containing numbers only",
    }),
  })
  .refine(
    (data) => data.discountUnit !== "percentage" || Number(data.discount) <= 99,
    {
      error: "For percentage discounts, the value must be at most 2",
      path: ["discount"],
    },
  );

export const couponCodeColumnsSchema = z.array(couponCodeSchema);
export const standardCampaignColumnsSchema = z.array(campaignSchema);
export const flashSaleColumnsSchema = z.array(flashSaleSchema);
export const buyXGetYFreeColumnsSchema = z.array(buyXGetYFreeSchema);