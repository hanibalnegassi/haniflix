import { authApi } from './authApi';
import { Movie } from '../types';

export const genresApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: (params?: Pagination) => ({
        url: 'genre',
        params
      }),
      providesTags: ['Genres']
    }),

    createGenre: builder.mutation({
      query: (data: Partial<Movie>) => ({
        url: 'genre',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Genres']
    }),

    deleteGenre: builder.mutation({
      query: (id: number | string) => ({
        url: `genre/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Genres']
    })
  }),
  overrideExisting: false
});

export const {
  useGetGenresQuery,
  useCreateGenreMutation,
  useDeleteGenreMutation
} = genresApi;
