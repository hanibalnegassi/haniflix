import { ScraperPostBody } from '../types';
import { authApi } from './authApi';

export const miscApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    syncMoviesToDb: builder.mutation({
      query: () => ({
        method: 'POST',
        url: 'misc/sync-movies-to-db'
      })
    })
  }),
  overrideExisting: false
});

export const { useSyncMoviesToDbMutation } = miscApi;
