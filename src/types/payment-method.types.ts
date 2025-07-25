import { z } from "zod";

export type GetPaymentMethodListPayload = {
  page?: number; // must be >= 1
  limit?: number; // must be between 1 and 100
};

export const CreateUpdatePaymentMethodPayloadSchema = z.object({
  id: z.number().min(1, { message: "ID is required" }).optional(),
  name: z.string().min(1, { message: "Name is required" }),
  qrCodeUrl: z.string().optional(),
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

export const PaymentMethodTableSchema = z.array(
  CreateUpdatePaymentMethodPayloadSchema,
);

export type PaymentMethodTableType = z.infer<typeof PaymentMethodTableSchema>;
export type CreateUpdatePaymentMethodPayload = z.infer<
  typeof CreateUpdatePaymentMethodPayloadSchema
>;

export interface PaymentMethod {
  id: number;
  name: string;
  qrCodeUrl?: string;
  accountType: "BANK" | "PAY";
  accountName: string;
  accountNo: string;
  cashOnDelivery: boolean;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaymentMethodsResponse {
  data: PaymentMethod[];
  message?: string;
  success?: boolean;
}

export interface PaymentMethodResponse {
  data: PaymentMethod;
  message?: string;
  success?: boolean;
}

// Legacy type aliases for backward compatibility during transition
/** @deprecated Use PaymentMethod instead */
export type Bank = PaymentMethod;
/** @deprecated Use CreateUpdatePaymentMethodPayload instead */
export type CreateUpdateBankPayload = CreateUpdatePaymentMethodPayload;
/** @deprecated Use CreateUpdatePaymentMethodPayloadSchema instead */
export const CreateUpdateBankPayloadSchema = CreateUpdatePaymentMethodPayloadSchema;
/** @deprecated Use GetPaymentMethodListPayload instead */
export type GetBankListPayload = GetPaymentMethodListPayload;
