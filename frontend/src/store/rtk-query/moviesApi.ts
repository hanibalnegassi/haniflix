import { authApi } from "./authApi";
import { Movie } from "../types";

export const moviesApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: (params?: Pagination) => ({
        url: "movies",
        params,
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result?.movies?.map(({ _id }) => ({
                type: "Movies" as const,
                id: _id,
              })),
              "Movies",
            ]
          : ["Movies"],
      // transformErrorResponse: (data) => {
      //   console.log(data);
      // },
    }),
    getRandomMovies: builder.mutation({
      query: (type: string | undefined) => ({
        url: "movies/random",
        params: type ? { type } : undefined,
      }),
    }),
    getMovie: builder.query({
      query: (id: number | string) => ({
        url: `movies/${id}`,
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              {
                type: "Movie" as const,
                //arg is movie Id
                id: arg,
              },
              "Movie",
            ]
          : ["Movie"],
    }),
    createMovie: builder.mutation({
      query: (data: Partial<Movie>) => ({
        url: "movies",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Movies"],
    }),
    updateMovie: builder.mutation({
      query: (id: number | string, data: Partial<Movie>) => ({
        url: `movies/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Movies", id: arg.id },
        { type: "Movie", id: arg.id },
      ],
    }),
    deleteMovie: builder.mutation({
      query: (id: number | string) => ({
        url: `movies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Movies"],
    }),
    likeMovie: builder.mutation({
      query: (id: number | string) => ({
        url: `movies/${id}/like`,
        method: "POST",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Movies", id: arg },
        { type: "Movie", id: arg },
      ],
    }),
    dislikeMovie: builder.mutation({
      query: (id: number | string) => ({
        url: `movies/${id}/dislike`,
        method: "POST",
      }),
      invalidatesTags: (result, error, arg) => [
        //arg is id
        { type: "Movies", id: arg },
        { type: "Movie", id: arg },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMoviesQuery,
  useGetRandomMoviesMutation,
  useGetMovieQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useLikeMovieMutation,
  useDislikeMovieMutation,
} = moviesApi;
