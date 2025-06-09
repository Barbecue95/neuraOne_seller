import { z } from "zod/v4";

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
