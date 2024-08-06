import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../rtk-query/authApi";
import type { RootState } from "../store";

interface AuthState {
  user: any;
  rememberMe: boolean;
  extras: any;
}

const initialState: AuthState = {
  user: null,
  rememberMe: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = undefined;
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.rememberMe = false;
    },
    updateToken: (state, action) => {
      if (action.payload.accessToken) {
        state.user.accessToken = action.payload.accessToken;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.extras = action;
        if (action?.meta.arg.originalArgs.rememberMe) {
          state.rememberMe = true;
        }

        state.loggedIn = true;
        state.user = payload;
      }
    );
  },
});

export const { setUser, updateToken, logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
