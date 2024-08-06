// @ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { updateToken } from "../reducers/auth";

const BASE_URL =
  import.meta.env.VITE_APP_API_URL || "http://localhost:8800/api/";

import Swal from "sweetalert2";

const logoutSuccess = () => {
  //window.location.href = "/";

  return {
    type: "auth/logout",
  };
};

const showSwal = (title, message, type) => {
  Swal.fire({
    title: title ?? "",
    text: message,
    icon: type,
  });
};

const onRefreshToken = async ({ dispatch, refreshToken }) => {
  try {
    if (!refreshToken) {
      return dispatch(logoutSuccess()); // Handle missing refresh token
    }

    const response = await fetch(`${BASE_URL}auth/refreshToken`, {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();

      dispatch(
        updateToken({
          accessToken: data?.accessToken,
        })
      ); // Update access token in store
    } else {
      dispatch(logoutSuccess()); // Handle refresh token failure
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    dispatch(logoutSuccess()); // Logout on error
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const authState = getState().auth;
    const accessToken = authState?.user?.accessToken;
    if (accessToken) {
      headers.set("token", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const { dispatch, getState } = api;

  const rememberMe = getState().auth?.rememberMe;

  if (result.error && result.error?.status === 401) {
    if (result.error?.data?.errorName === "loggedElsewhere") {
      dispatch(logoutSuccess());
      showSwal(
        "You were logged out",
        "Your account was logged into, in another device",
        "success"
      );
    } else if (rememberMe == false) {
      dispatch(logoutSuccess());
    } else {
      const refreshToken = getState().auth?.user?.refreshToken;
      await onRefreshToken({ dispatch, refreshToken });

      result = await baseQuery(args, api, extraOptions); // Retry with new token
    }
  }
  return result;
};
