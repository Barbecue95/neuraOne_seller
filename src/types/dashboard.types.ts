import { z } from "zod";

/**
 * Payment -> Transaction -> Order -> Data -> Root response schemas
 * Coerce numeric strings to numbers using preprocess for safety.
 */

const PaymentSchema = z.object({
  id: z.number(),
  name: z.string(),
  accountName: z.string().nullable().optional(),
  accountNumber: z.string().nullable().optional(),
  qrCode: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const TransactionSchema = z.object({
  id: z.number(),
  orderId: z.number(),
  // amount is provided as string in sample -> coerce to number
  amount: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number()
  ),
  status: z.string(),
  paymentId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  payment: PaymentSchema.nullable().optional(),
});

const UserSchema = z.object({
  name: z.string(),
  city: z.string().nullable().optional(),
  township: z.string().nullable().optional(),
  address: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().nullable().optional(),
  role: z.string().optional(),
  profileImage: z.string().nullable().optional(),
});

const OrderAddressObjectSchema = z.object({
  address: z.string(),
  landmark: z.string().nullable().optional(),
});

const OrderSchema = z.object({
  id: z.number(),
  userId: z.number(),
  status: z.string(),
  subTotalAmount: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number()
  ),
  totalAmount: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number()
  ),
  shippingFee: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number()
  ),
  notes: z.string().nullable().optional(),
  // address can be string or object (sample includes both forms)
  address: z.union([z.string(), OrderAddressObjectSchema]).optional(),
  discount: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number()
  ),
  discountType: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: UserSchema,
  transaction: TransactionSchema.nullable().optional(),
});

const TopSellingProductSchema = z.object({
  productId: z.number(),
  productName: z.string(),
  productImage: z.string().nullable().optional(),
  productQuantity: z.number(),
});

const SalesItemSchema = z.object({
  label: z.string(),
  total: z.number(),
});

const DataSchema = z.object({
  totalPendingOrder: z.number(),
  totalOrder: z.number(),
  totalRevenue: z.number(),
  totalUser: z.number(),
  totalProduct: z.number(),
  topSellingProducts: z.array(TopSellingProductSchema),
  // note: key name in payload is "REcentOrders" (capital E) — keep it
  REcentOrders: z.array(OrderSchema),
  sales: z.array(SalesItemSchema),
});

export const DashboardResponseSchema = z.object({
  status: z.boolean(),
  data: DataSchema,
  message: z.string(),
});

export type DashboardResponse = z.infer<typeof DashboardResponseSchema>;
export type TopSellingProductType = z.infer<typeof TopSellingProductSchema>;
export type SalesItemType = z.infer<typeof SalesItemSchema>;
