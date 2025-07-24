import { User } from "@/types/users.types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
  id: 1,
  name: "JU Admin",
  email: "JU@example.com",
  avatar: "https://github.com/shadcn.png",
  role: "admin",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  phoneNumber: "123-456-7890",
  age: 30,
  status: "active",
  password: "hashed_password",
  floorNo: null,
  unit: null,
  areaType: "urban",
  address: null,
  preferences: null,
  totalOrderAmount: null,
  totalOrderCount: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  gender: "",
  regionId: 1,
  cityId: 1,
  townshipId: 1,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (_state, action: PayloadAction<User>) => action.payload,
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
