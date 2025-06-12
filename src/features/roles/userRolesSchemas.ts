import { z } from "zod/v4";

export const rolesSchema = z.object({
  id: z.number(),
  name: z.string(),
  TotalUsers: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const usersSchema = z.object({
  id: z.number(),
  name: z.string().min(3, { message: "Name is required" }),
  email: z.email({ message: "Email is invalid" }),
  phone: z.string().min(10, { message: "Phone is required" }),
  rolesId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const userRolesColumnsSchema = z.array(rolesSchema);
export const usersColumnsSchema = z.array(usersSchema);
