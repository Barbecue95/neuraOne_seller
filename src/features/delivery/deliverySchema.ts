import { z } from "zod/v4";

const shippingCompaySchema = z.object({
  companyName: z.string().min(3, { message: "Company Name is required" }),
  email: z.email({ message: "Email is invalid" }),
  phoneNo: z.string().min(10, { message: "Phone Number is required" }),
  postalCode: z.string().optional(),
  address: z.string().min(3, { message: "Address is required" }),
  city: z.string().min(3, { message: "City is required" }),
});
const WeightFeeSchema = z.object({
  id: z.number(),
  weight: z.enum(["Under 3kg", "Equal 3kg", "Over 3kg"]),
  fee: z.number().or(z.enum(["Free", "Not Delivered"])),
});
const sizeFeeSchema = z.object({
  id: z.number(),
  size: z.enum(["small", "medium", "large", "extra large"]),
  fee: z.number().or(z.enum(["Free", "Not Delivered"])),
});
const citySchema = z.object({
  id: z.number(),
  cityName: z.string(),
  duration: z.string(),
  deliveryFee: z.number().optional(),
  weightFee: z.array(WeightFeeSchema).optional(),
  sizeFee: z.array(sizeFeeSchema).optional(),
});

export const deliverySchema = z
  .object({
    id: z.number(),
    companyInfo: shippingCompaySchema,
    isFreeDelivery: z.boolean(),
    deliveryCities: z.array(citySchema).optional(),
    deliveryType: z.enum(["Flat", "Weight", "Size"]),
  })
  .check((ctx) => {
    if (!ctx.value.isFreeDelivery && !ctx.value.deliveryCities) {
      ctx.issues.push({
        code: "custom",
        message: "Delivery Cities are required",
        path: ["deliveryCities"],
        inclusive: true,
        input: ctx.value.deliveryCities,
        continue: true,
      });
    }
    if (ctx.value.deliveryType === "Flat" && !ctx.value.deliveryCities) {
      ctx.issues.push({
        code: "custom",
        message: "Delivery Cities are required",
        path: ["deliveryCities"],
        inclusive: true,
        input: ctx.value.deliveryCities,
        continue: true,
      });
    }
    if (ctx.value.deliveryType === "Weight" && !ctx.value.deliveryCities) {
      ctx.issues.push({
        code: "custom",
        message: "Delivery Cities are required",
        path: ["deliveryCities"],
        inclusive: true,
        input: ctx.value.deliveryCities,
        continue: true,
      });
    }
    if (ctx.value.deliveryType === "Size" && !ctx.value.deliveryCities) {
      ctx.issues.push({
        code: "custom",
        message: "Delivery Cities are required",
        path: ["deliveryCities"],
        inclusive: true,
        input: ctx.value.deliveryCities,
        continue: true,
      });
    }
  });

export const deliveryColumnsSchema = z.array(deliverySchema);
export const citiesColumsSchema = z.array(citySchema);
