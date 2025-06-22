import { z } from "zod/v4";

export const notificationSchema = z.object({
  id: z.number(),
  name: z.string(),
  audience: z.string(),
  status: z.enum(["Sent", "Delivered", "Cancelled"]),
  sentDate: z.date(),
});
export const notificationColumnsSchema = z.array(notificationSchema);
