import { authApi } from "./authApi";

export const avatarsApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvatars: builder.query({
      query: (params?: Pagination) => ({
        url: "image/avatar",
        params,
      }),
      providesTags: ["Avatars"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAvatarsQuery } = avatarsApi;
