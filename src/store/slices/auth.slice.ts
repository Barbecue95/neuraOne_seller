// store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  profileImage: string | null;
  region: string;
  city: string;
  township: string;
  address: string;
  type: string;
  role: string;
  status: string;
  createdAt: string;
}

interface AuthState {
  user: UserInfo | null;
}

// ✅ Utility function to validate and sanitize createdAt
function fixUser(user: any): UserInfo | null {
  if (!user) return null;

  let createdAt = user.createdAt;

  // If it's a Date object or something non-string, convert safely
  if (typeof createdAt !== "string") {
    try {
      const date = new Date(createdAt);
      createdAt = isNaN(date.getTime())
        ? new Date().toISOString()
        : date.toISOString();
    } catch {
      createdAt = new Date().toISOString(); // fallback to now if invalid
    }
  }

  return {
    ...user,
    createdAt,
  };
}

const initialState: AuthState = {
  user:
    typeof window !== "undefined"
      ? fixUser(JSON.parse(localStorage.getItem("userInfo") || "null"))
      : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      const user = fixUser(action.payload);
      state.user = user;
      localStorage.setItem("userInfo", JSON.stringify(user));
    },
    clearUserInfo: (state) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
    getUserInfo: (state) => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("userInfo");
        if (stored) {
          state.user = fixUser(JSON.parse(stored));
        }
      }
    },
  },
});

export const { setUserInfo, clearUserInfo, getUserInfo } = authSlice.actions;
export default authSlice.reducer;
