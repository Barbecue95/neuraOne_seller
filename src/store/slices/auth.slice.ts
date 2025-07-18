// store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: UserInfo | null;
}

const initialState: AuthState = {
  user: typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('userInfo') || 'null')
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    clearUserInfo: (state) => {
      state.user = null;
      localStorage.removeItem('userInfo');
    },
    getUserInfo: (state) => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('userInfo');
        if (stored) {
          state.user = JSON.parse(stored);
        }
      }
    },
  },
});

export const { setUserInfo, clearUserInfo, getUserInfo } = authSlice.actions;
export default authSlice.reducer;
