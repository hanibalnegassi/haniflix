const { searchAndScrapeMovies } = require("./functions");
const { extractMovieInfoFromCdnUrl } = require("./helpers");

const Logger = require("../../lib/logger");

const { Movie } = require("../../models");

const BATCH_SIZE = 5;
let isScraping = false; // Variable to track if scraping is in progress
let totalCount = 0;
let processedCount = 0;
let stopProcess = false;
let callback; // callback functions from child function

const NODE_ENV = process.env.NODE_ENV;

const setProcessedCount = (count) => {
  processedCount = count;
};

const setCallBack = (_callback) => {
  callback = _callback;
};

//CREATE
const scrapeAllMovies = async (io, req, res) => {
  try {
    const type = req.body.type;

    // Check if scraping process is already running
    if (isScraping) {
      return res
        .status(400)
        .json({ message: "A scraping process is currently running" });
    }

    // Lock the API
    isScraping = true;

    let query = {};

    if (NODE_ENV === "production") {
      query = {
        $or: [
          // { title: { $exists: false } },
          { desc: { $exists: false } },
          { desc: '' },
          { img: { $exists: false } },
          { img: '' },
          // { imgTitle: { $exists: false } },
          // { year: { $exists: false } },
          { ageRating: { $exists: false } },
          { ageRating: '' },
          { duration: { $exists: false } },
          { duration: '' },
        ],
      }
    }

    if (type == "failed_movies") {
      query = {
        failedDuringScrape: true,
      };
    }

    // Get the total count of movies that match the filter
    totalCount = await Movie.countDocuments(query);
    console.log("totalCount: ", totalCount)
    let page = 1;
    let totalPages = Math.ceil(totalCount / BATCH_SIZE);
    let localProcessedCount = 0;
    let batchCount = 1;

    // Emit details and progress at start
    io.emit("scrapeDetails", {
      total: totalCount,
      processed: processedCount,
    });

    while (page < totalPages + 1) {
      const skip = (page - 1) * BATCH_SIZE;
      Logger.info(`Batch ${batchCount} starting -----`);

      const moviesToProcess = await Movie.find(query)
        .skip(skip)
        .limit(BATCH_SIZE);

      const batch = moviesToProcess;
      const movieInfos = [];

      for (const movie of batch) {
        const cdnUrl = movie.video; // Update with the correct field containing CDN URL
        const movieInfo = extractMovieInfoFromCdnUrl(cdnUrl, movie?._id, movie);
        if (movieInfo) {
          movieInfos.push(movieInfo);
        }
        //if movie extraction was not successful add to failed during scrape
        else {
          await Movie.findByIdAndUpdate(
            movie?._id,
            {
              $set: {
                failedDuringScrape: true,
              },
            },
            { new: true }
          );

          Logger.error(
            `Movie ( ${movie?.title} / ${movie?._id} ) name & year could not be extracted`
          );
        }
        //immediately adds BATCH_SIZE
        localProcessedCount++;
      }

      await searchAndScrapeMovies(
        movieInfos,
        io,
        totalCount,
        //remove batch size to ensure count is accurate
        localProcessedCount - BATCH_SIZE,
        batchCount,
        setProcessedCount,
        stopProcess,
        setCallBack
      );

      // stop in outer while loop if inner has stopped
      if (stopProcess) {
        Logger.error("[controller.js] Scraping process stopped remotely.");
        stopProcess = false; // Reset stopProcess
        break; // Exit the outer loop immediately
      }

      page++;

      Logger.info(`Batch ${batchCount} complete -----`);
      batchCount++;
    }

    // Unlock the API after scraping is complete
    isScraping = false;
    processedCount = 0;

    res.status(200).json({
      success: true,
      message: `${totalCount} scraped and imported`,
    });
  } catch (err) {
    console.log("error ", err);

    isScraping = false;

    res.status(500).json(err);
  }
};

const stopScraping = (io, req, res) => {
  if (!isScraping) {
    res.status(400).send({
      message: "No current scraping process",
    });
    return;
  }

  // console.log("callback ", callback);

  // if (callback && callback?.closeBrowser) {
  //   callback.closeBrowser?.();
  //   Logger.error(
  //     "[stopscraping.controller.js] Scraping process stopped remotely."
  //   );
  //   stopProcess = false;
  // }

  io.emit("scrapeDetails", {
    total: totalCount,
    processed: processedCount,
  });

  stopProcess = true;
  res.status(200).json({
    success: true,
    message: `Scraping stop sent!\nWill stop after current batch.`,
  });
};

const checkScrapingProgress = (io, req, res) => {
  if (!isScraping) {
    res.status(400).send({
      message: "No current scraping process",
    });
    return;
  }

  io.emit("scrapeDetails", {
    total: totalCount,
    processed: processedCount,
  });
  res.status(200).json({
    message: "Scraping progress emitted",
    total: totalCount,
    processed: processedCount,
  });
};

module.exports = {
  scrapeAllMovies,
  stopScraping,
  checkScrapingProgress,
};
