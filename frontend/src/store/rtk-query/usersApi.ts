import { User } from "../types";
import { authApi } from "./authApi";

type UpdateUserReq = {
  id: number | string;
  data: Partial<User>;
};

export const usersApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params?: Pagination) => ({
        url: "users",
        params,
      }),
      providesTags: ["Users"],
    }),
    getUser: builder.query({
      query: (id: number | string) => ({
        url: `users/find/${id}`,
      }),
    }),
    createUser: builder.mutation({
      query: (data: Partial<User>) => ({
        url: "users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ id, data }: UpdateUserReq) => ({
        url: `users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUserPassword: builder.mutation({
      query: ({ id, data }) => ({
        url: `users/updatePassword/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id: number | string) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),
    cancelSub: builder.mutation({
      query: (id: number | string) => ({
        url: `users/${id}/cancel-sub`,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserPasswordMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCancelSubMutation,
} = usersApi;
