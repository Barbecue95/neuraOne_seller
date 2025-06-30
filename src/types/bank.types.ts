import {
  bankColumnsSchema,
  bankWalletSchema,
  digitalColumnsSchema,
  digitalWalletSchema,
  transactionColumnsSchema,
  transactionSchema,
} from "@/features/payments/paymentSchema";
import { z } from "zod";

export type GetBankListPayload = {
  page?: number; // must be >= 1
  limit?: number; // must be between 1 and 100
};

export const CreateUpdateBankPayloadSchema = z.object({
  id: z.number().min(1, { message: "ID is required" }).optional(),
  name: z.string().min(1, { message: "Name is required" }),
  qrCodeUrl: z.string().min(1, { message: "QR Code is required" }).optional(),
  accountType: z.enum(["BANK", "PAY"], {
    required_error: "Account type is required",
    invalid_type_error: "Account type must be either 'BANK' or 'PAY'",
  }),
  accountName: z
    .string()
    .min(3, { message: "Account name is required" })
    .max(50, { message: "Account name must be at most 50 characters" }),
  accountNo: z
    .string()
    .min(10, { message: "Phone Number must be at least 10 characters" })
    .max(30, { message: "Phone Number must be at most 30 characters" }),
  cashOnDelivery: z.boolean(),
  imageUrl: z.string().optional(),
});

export type CreateUpdateBankPayload = z.infer<
  typeof CreateUpdateBankPayloadSchema
>;
