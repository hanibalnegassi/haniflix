const router = require("express").Router();
const puppeteer = require("puppeteer");

const verify = require("../middleware/verifyToken");

const scraperController = require("../controllers/scraper");

module.exports = (io) => {
  router.post("/scrape", verify, (req, res) => {
    scraperController.scrapeMovieFromUrl(req, res);
  });

  router.post("/scrape-all", verify, (req, res) => {
    scraperController.scrapeAll(io, req, res);
  });

  router.post("/stop-scraping", verify, (req, res) => {
    scraperController.stopScraping(io, req, res);
  });

  router.post("/check-scraping", verify, (req, res) => {
    scraperController.checkScrapingProgress(io, req, res);
  });

  return router;
};
