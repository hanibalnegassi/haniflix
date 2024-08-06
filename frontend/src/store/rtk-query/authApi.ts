import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginRequest } from "../types";

import { baseQueryWithReauth } from "./customBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Profile", "Movies", "Movie", "Lists", "Users", "Avatars"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: LoginRequest) => {
        return {
          url: "auth/login",
          method: "POST",
          body,
        };
      },
      //transformErrorResponse: (err) => console.log(err),
    }),
  }),
});

export const { useLoginMutation } = authApi;
