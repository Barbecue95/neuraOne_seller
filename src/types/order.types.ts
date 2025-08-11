import { z } from "zod/v4";

export const OrderItemSchema = z.object({
  id: z.number(),
  orderId: z.number(),
  productId: z.number(),
  variantValueId: z.number(),
  unitPrice: z.string(),
  quantity: z.number(),
  totalAmount: z.optional(z.string()), // ! Only For Updating Order Item Identifier, do not used This Value in backend side
});

export const addressSchema = z.object({
  address: z.string(),
  landmark: z.string(),
});

export type OrderItemPayload = z.infer<typeof OrderItemSchema>;
export const UpdateOrderPayloadSchema = z.object({
  address: addressSchema.partial(),
  notes: z.string(),
  items: z.array(OrderItemSchema),
});
export type UpdateOrderPayload = Partial<
  z.infer<typeof UpdateOrderPayloadSchema>
>;
export const OrderSchema = z.object({
  id: z.number(),
  userId: z.number(),
  status: z.string(),
  subTotalAmount: z.string(),
  totalAmount: z.string(),
  shippingFee: z.string(),
  notes: z.string(),
  address: addressSchema.partial(),
  discount: z.string(),
  discountType: z.enum(["PERCENTAGE", "FIXED"]),
  createdAt: z.string(),
  updatedAt: z.string(),
  items: z.array(
    z.object({
      id: z.number(),
      orderId: z.number(),
      productId: z.number(),
      quantity: z.number(),
      unitPrice: z.string(),
      product: z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        images: z.array(
          z.object({
            id: z.number(),
            url: z.string(),
            isMain: z.boolean(),
            productId: z.number(),
            createdAt: z.string(),
            updatedAt: z.string(),
          })
        ),
        purchasePrice: z.string(),
        sizeValue: z.string(),
        promoteAmount: z.string(),
        promotePercent: z.string(),
        promoteEndDate: z.string(),
        promoteStartDate: z.string(),
        promoteStatus: z.string(),
        sellingPrice: z.string(),
      }),
      variantValueId: z.number(),
      variantValue: z.object({
        id: z.number(),
        name: z.string(),
        sellingPrice: z.string(),
        sku: z.string(),
        variantValues: z.array(
          z.object({
            name: z.string(),
            value: z.string(),
          })
        ),
      }),
    })
  ),
  user: z.object({
    name: z.string(),
    city: z.string().nullable(),
    township: z.string().nullable(),
    address: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    role: z.enum(["USER", "ADMIN"]),
    profileImage: z.string().nullable(),
  }),
  transaction: z.object({
    id: z.number(),
    orderId: z.number(),
    amount: z.string(),
    status: z.string(),
    paymentId: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    payment: z.object({
      id: z.number(),
      name: z.string(),
      accountName: z.string(),
      accountNumber: z.string(),
      qrCode: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
  }),
});
export type Order = z.infer<typeof OrderSchema>;

export const OrderApiSchema = z.object({
  status: z.boolean(),
  data: OrderSchema,
  message: z.string(),
});
export const OrderListApiSchema = z.object({
  status: z.boolean(),
  data: z.array(OrderSchema),
  message: z.string(),
  meta: z.object({
    total: z.number(),
    limit: z.number(),
    page: z.number(),
  }),
});
export type OrderListApiResponse = z.infer<typeof OrderListApiSchema>;

export type OrderApiResponse = z.infer<typeof OrderApiSchema>;

export type OrderColumnDef = {
  id: number;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  quantity: number | null;
  status: string;
};

export enum OrderSortPeriodOption {
  TODAY = "today",
  YESTERDAY = "yesterday",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
}

export enum OrderSortOption {
  NAME_ASC = "nameAsc",
  NAME_DESC = "nameDesc",
  DATE_ASC = "dateAsc",
  DATE_DESC = "dateDesc",
  TOTAL_AMOUNT_ASC = "totalAsc",
  TOTAL_AMOUNT_DESC = "totalDesc",
  QUANTITY_ASC = "qtyAsc",
  QUANTITY_DESC = "qtyDesc",
  NEWEST = "newest",
  OLDEST = "oldest",
}
