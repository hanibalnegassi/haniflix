import { authApi } from "./authApi";
import { Movie } from "../types";

export const genresApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: (params?: Pagination) => ({
        url: "genre",
        params,
      }),
      providesTags: ["Genres"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetGenresQuery } = genresApi;
