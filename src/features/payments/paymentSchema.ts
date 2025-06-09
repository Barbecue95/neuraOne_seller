import { z } from "zod";

export const digitalWalletSchema = z.object({
  id: z.number().min(1, { message: "ID is required" }),
  qrcode: z.string().min(1, { message: "QR Code is required" }),
  accountName: z
    .string()
    .min(3, { message: "Account name is required" })
    .max(50, { message: "Account name must be at most 50 characters" }),
  accountNumber: z
    .string()
    .min(10, { message: "Phone Number must be at least 10 characters" })
    .max(30, { message: "Phone Number must be at most 30 characters" }),
  status: z.literal("active").or(z.literal("disabled")),
});

export const bankWalletSchema = z.object({
  id: z.number(),
  accountName: z
    .string()
    .min(3, { message: "Account name is required" })
    .max(50, { message: "Account name must be at most 50 characters" }),
  accountNumber: z
    .string()
    .min(10, { message: "Account number must be at least 10 characters" })
    .max(30, { message: "Account number must be at most 30 characters" }),
  status: z.literal("active").or(z.literal("disabled")),
});

export const transactionSchema = z.object({
  id: z.number(),
  orderId: z.number(),
  amount: z.number(),
  method: z.string(),
  status: z
    .literal("Paid")
    .or(z.literal("Unpaid"))
    .or(z.literal("Refunded"))
    .or(z.literal("Pending")),
  date: z.date(),
});

export const transactionColumnsSchema = z.array(transactionSchema);

export const bankColumnsSchema = z.array(bankWalletSchema);

export const digitalColumnsSchema = z.array(digitalWalletSchema);
