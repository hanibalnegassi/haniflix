import { ScraperPostBody } from '../types';
import { authApi } from './authApi';

export const statsApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => ({
        url: 'stats/admin-dashboard'
      })
    })
  }),
  overrideExisting: false
});

export const { useGetStatsQuery } = statsApi;
