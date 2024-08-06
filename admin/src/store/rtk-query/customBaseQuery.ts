// @ts-nocheck
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { updateToken } from '../reducers/auth';

import toast from 'react-hot-toast';

const BASE_URL =
  import.meta.env.VITE_BASE_API_URL || 'http://localhost:8800/api/';

const logoutSuccess = () => {
  return {
    type: 'auth/logout'
  };
};

const onRefreshToken = async ({ dispatch, refreshToken }) => {
  try {
    if (!refreshToken) {
      return dispatch(logoutSuccess()); // Handle missing refresh token
    }

    const response = await fetch(`${BASE_URL}auth/refreshToken`, {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      const data = await response.json();

      dispatch(
        updateToken({
          accessToken: data?.accessToken
        })
      ); // Update access token in store
    } else {
      dispatch(logoutSuccess()); // Handle refresh token failure
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    dispatch(logoutSuccess()); // Logout on error
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const authState = getState().auth;
    const accessToken = authState?.user?.accessToken;

    if (accessToken) {
      headers.set('token', `Bearer ${accessToken}`);
    }
    return headers;
  }
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const { dispatch, getState } = api;

  if (result.error && result.error.status === 401) {
    if (result.error?.data?.errorName === 'loggedElsewhere') {
      dispatch(logoutSuccess());
      toast.error('Your account was logged into, in another device', {
        position: 'top-right'
      });
    }
    // else if (rememberMe == false) {
    //   dispatch(logoutSuccess());
    // }
    else {
      const refreshToken = getState().auth?.user?.refreshToken;
      await onRefreshToken({ dispatch, refreshToken });

      result = await baseQuery(args, api, extraOptions); // Retry with new token
    }
  }
  return result;
};
