import { ScraperPostBody } from '../types';
import { authApi } from './authApi';

export const scraperApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    scrapeWebsite: builder.mutation({
      query: (data: Partial<ScraperPostBody>) => ({
        url: 'scraper/scrape',
        method: 'POST',
        body: data
      })
    }),
    scrapeAllMovies: builder.mutation({
      query: (data) => ({
        url: 'scraper/scrape-all',
        method: 'POST',
        body: data
      })
    }),
    checkScraping: builder.mutation({
      query: () => ({
        url: 'scraper/check-scraping',
        method: 'POST'
        // body: data
      })
    }),
    stopScraping: builder.mutation({
      query: () => ({
        url: 'scraper/stop-scraping',
        method: 'POST'
        // body: data
      })
    })
  }),
  overrideExisting: false
});

export const {
  useScrapeWebsiteMutation,
  useScrapeAllMoviesMutation,
  useCheckScrapingMutation,
  useStopScrapingMutation
} = scraperApi;
