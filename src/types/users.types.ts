import { string } from "zod/v4";

export type User = {
  avatar: string;
  bio: string;
  age: number;
  status: string;
  id: number;
  name: string;
  email: string;
  phoneNumber: string | null;
  password: string;
  region: string;
  city: string;
  township: string;
  floorNo: string | null;
  unit: string | null;
  areaType: string;
  address: string | null;
  preferences: string | null;
  totalOrderAmount: number | null;
  totalOrderCount: number | null;
  role: string;
  avatar?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserColumnDef = {
  id: number;
  name: string;
  phoneNumber: string | null;
  email: string;
  totalOrderAmount: number | null;
  totalOrderCount: number | null;
  status: string;
};

export enum UserSortOption {
  NAME_ASC = "nameAsc",
  NAME_DESC = "nameDesc",
  PHONE_ASC = "phoneAsc",
  PHONE_DESC = "phoneDesc",
  EMAIL_ASC = "emailAsc",
  EMAIL_DESC = "emailDesc",
  TOTAL_ORDER_COUNT_ASC = "orderCountAsc",
  TOTAL_ORDER_COUNT_DESC = "orderCountDesc",
  TOTAL_ORDER_AMOUNT_ASC = "orderAmountAsc",
  TOTAL_ORDER_AMOUNT_DESC = "orderAmountDesc",
  NEWEST = "newest",
  OLDEST = "oldest",
}
