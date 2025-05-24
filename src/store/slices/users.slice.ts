import { User } from "@/types/users.types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
  id: 1,
  name: "JU Admin",
  email: "JU@example.com",
  avatar: "https://github.com/shadcn.png",
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
