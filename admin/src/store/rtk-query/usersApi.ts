import { User } from '../types';
import { authApi } from './authApi';

export const usersApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params?: Pagination) => ({
        url: 'users',
        params
      }),
      providesTags: ['Users']
    }),
    getUser: builder.query({
      query: (id: number | string) => ({
        url: `users/${id}`
      })
    }),
    createUser: builder.mutation({
      query: (data: Partial<User>) => ({
        url: 'users',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Users']
    }),
    updateUser: builder.mutation({
      query: ({ itemId, data }) => ({
        url: `users/${itemId}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Users']
    }),
    deleteUser: builder.mutation({
      query: (id: number | string) => ({
        url: `users/${id}`,
        method: 'DELETE'
      })
    })
  }),
  overrideExisting: false
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = usersApi;
