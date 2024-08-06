import { authApi } from './authApi';

export const avatarsApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvatars: builder.query({
      query: (params?: Pagination) => ({
        url: 'image/avatar',
        params
      }),
      providesTags: ['Avatars']
    }),
    deleteAvatar: builder.mutation({
      query: (id: number | string) => ({
        url: `image/avatar/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Avatars']
    }),
    uploadImage: builder.mutation({
      query: (body) => ({
        url: `image/upload`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Avatars']
    })
  }),
  overrideExisting: false
});

export const {
  useGetAvatarsQuery,
  useDeleteAvatarMutation,
  useUploadImageMutation
} = avatarsApi;
