import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { authApi } from '../rtk-query/authApi';

interface AuthState {
  user: any;
  loggedIn: boolean;
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

const initialState: AuthState = {
  user: null,
  loggedIn: false,
  accessToken: undefined,
  refreshToken: undefined
};

export const authSlice = createSlice({
  name: 'auth',
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
    },
    updateToken: (state, action) => {
      if (action.payload.accessToken) {
        state.user.accessToken = action.payload.accessToken;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        // state.refreshToken = payload.refreshToken;
        if (payload.isAdmin == true) {
          state.loggedIn = true;
          state.user = payload;
        }
      }
    );
  }
});

export const { setUser, updateToken, logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
