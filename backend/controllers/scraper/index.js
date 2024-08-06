const scrapeMovieFromUrl = require("./scrape");
const {
  scrapeAllMovies,
  stopScraping,
  checkScrapingProgress,
} = require("./scrapeAll");

module.exports = {
  scrapeMovieFromUrl,
  scrapeAll: scrapeAllMovies,
  stopScraping,
  checkScrapingProgress,
};
