const puppeteer = require("puppeteer");
const { Movie } = require("../../models");
const Genre = require("../../models/Genre");
const Logger = require("../../lib/logger");
const mongoose = require('mongoose'); // Import mongoose

const DELAY_AFTER_MOVIES = 2;
const BATCH_SIZE = 5;
const SEARCH_PAGE_URL = "https://yts.mx/";

let pageInstanceForMultiple;
let browser;

async function initBrowser() {
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      timeout: 3 * 60 * 1000,
      protocolTimeout: 5 * 60 * 1000,
    });
  } catch (error) {
    Logger.error(`Error while initializing browser: ${error.message}`);
  }
}

async function closeBrowser() {
  try {
    if (browser) {
      await browser.close();
      browser = undefined;
    }
  } catch (error) {
    Logger.error(`Error while closing browser: ${error.message}`);
  }
}

const checkPageIsReady = async (page) => {
  try {
    await page.waitForSelector('#quick-search-input');
    await page.type('#quick-search-input', "dummy text");
    await page.evaluate(() => {
      document.querySelector('#quick-search-input').value = "";
    });
    await page.waitForFunction(
      'document.querySelector(\'#quick-search-input\').value === ""'
    );
  } catch (error) {
    Logger.error(`Error in checkPageIsReady: ${error.message}`);
  }
};

async function scrapeMovieDetails({ _page, url }) {
  let browserInitializedLocally = false;

  if (!browser) {
    await initBrowser();
    browserInitializedLocally = true;
  }

  let page;

  try {
    if (!_page) {
      page = await browser.newPage();
      await page.setExtraHTTPHeaders({
        "Accept-Language": "en-US,en;q=0.9",
      });
      await page.setUserAgent("Mozilla/5.0 ... Chrome/66.0.3359.181 Safari/537.36");
      await page.setViewport({ width: 1366, height: 768 });
      await page.goto(url, {
        waitUntil: ["domcontentloaded", "networkidle2", "load"],
      });
    } else if (_page instanceof puppeteer.Page) {
      page = _page;
    }

    const movieDetails = await page.$eval("body", (body) => {
      const title = body.querySelector("#movie-info .hidden-xs h1")?.textContent.trim();
      const yearOfRelease = body.querySelector("#movie-info .hidden-xs h2:nth-of-type(1)")?.textContent.trim();
      const genreText = body.querySelector("#movie-info .hidden-xs h2:nth-of-type(2)")?.textContent.trim();
      const fullDescription = body.querySelector("#synopsis p")?.textContent.trim();
      const ageRatingDiv = body.querySelector('.tech-spec-element.col-xs-20.col-sm-10.col-md-5 span[title="MPA Rating"]').parentElement;
      const ageRating = ageRatingDiv.childNodes[2].nodeValue.trim();
      const durationElement = body.querySelector('.tech-spec-element .icon-clock').parentElement;
      const duration = durationElement.textContent.trim();
      const imageUrl = body.querySelector("#movie-poster img")?.src || "";
      const largestImageUrl = body.querySelector('a.youtube#playTrailer')?.href || "";
      const genre = genreText ? genreText.split(' / ').map(g => g.trim()) : [];

      return {
        title,
        description: fullDescription,
        imageUrl,
        largestImageUrl,
        ageRating,
        genre,
        yearOfRelease,
        duration,
      };
    });

    return movieDetails;
  } catch (error) {
    Logger.error(`Error scraping movie details: ${error.message}`);
    return {};
  } finally {
    if (!_page) {
      await page.close();
    }
    if (browserInitializedLocally) {
      await closeBrowser();
    }
  }
}

async function searchAndScrapeMovies(
  movieInfos,
  io,
  totalCount,
  currentCount,
  batchCount,
  setProcessedCount,
  _stopProcess,
  setCallBack
) {
  let stopProcess = _stopProcess;
  let countInCurrentBatch = 0;
  const processedMoviesData = [];
  let page = pageInstanceForMultiple;

  console.log("Function Started")

  setCallBack({});

  if (!browser) {
    await initBrowser();
  }

  try {
    if (!pageInstanceForMultiple) {
      page = await browser.newPage();
      pageInstanceForMultiple = page;
    }

    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });
    await page.setUserAgent("Mozilla/5.0 ... Chrome/66.0.3359.181 Safari/537.36");
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(SEARCH_PAGE_URL, {
      waitUntil: ["domcontentloaded", "networkidle2", "load"],
    });

    await checkPageIsReady(page);

    const processMovie = async (movieInfo) => {
      const movieDetail = await searchAndScrapeMovie(page, movieInfo.movieName, movieInfo.movieYear);
      if (movieDetail) {
        processedMoviesData.push({
          ...movieDetail,
          movieId: movieInfo.movieId,
          cdnUrlMovieName: movieInfo.movieName,
        });
      }
      await page.$eval('#quick-search-input', (input) => (input.value = ""));
    };

    for (const movieInfo of movieInfos) {
      let addedMovie;
      let retryCount = 0;
      const RETRY_ATTEMPTS = 1;
      countInCurrentBatch++;

      while (!addedMovie && retryCount <= RETRY_ATTEMPTS) {
        try {
          await processMovie(movieInfo);

          if (stopProcess) {
            await closeBrowser();
            break;
          }

          // Cast movieId to ObjectId
          let movieObjectId;
          try {
            movieObjectId = new mongoose.Types.ObjectId(movieInfo.movieId);
          } catch (castError) {
            Logger.error(`Invalid ObjectId: ${movieInfo.movieId}`);
            continue;
          }

          addedMovie = processedMoviesData.find((processedMovieData) => processedMovieData.movieId.toString() === movieObjectId.toString());

          if (addedMovie) {
            let genreIds = [];
            if (Array.isArray(addedMovie.genre)) {
              for (const genreItem of addedMovie.genre) {
                const findGenreMatch = await Genre.findOne({ title: genreItem.toLowerCase() });
                if (findGenreMatch) {
                  genreIds.push(findGenreMatch._id);
                  continue;
                }
                const newGenre = new Genre({ title: genreItem.toLowerCase() });
                const savedGenre = await newGenre.save();
                genreIds.push(savedGenre._id);
              }
            }

            const newFields = {
              title: addedMovie.title,
              desc: addedMovie.description,
              img: addedMovie.imageUrl,
              imgTitle: addedMovie.largestImageUrl || addedMovie.imageUrl,
              ageRating: addedMovie.ageRating,
              duration: addedMovie.duration,
              year: addedMovie.yearOfRelease,
              genre: genreIds,
            };

            let pulledMovieName = addedMovie.title.replace(/[^\w\s]/gi, "").toLowerCase();
            let cdnUrlMovieName = addedMovie.cdnUrlMovieName.replace(/[^\w\s]/gi, "").toLowerCase();
            const allMovieWordsIncluded = cdnUrlMovieName.trim().split(" ").every((word) => pulledMovieName.includes(word));

            if (!allMovieWordsIncluded) {
              throw new Error("DB movie details not matching with pulled data");
            }

            let updatedMovie = await Movie.findByIdAndUpdate(
              movieObjectId, // Use the ObjectId instance
              { $set: newFields },
              { new: true }
            );
            if (updatedMovie.failedDuringScrape == true) {
              updatedMovie = await Movie.findByIdAndUpdate(updatedMovie._id, { $unset: { failedDuringScrape: "" } });
            }
            await updatedMovie.save();
          }

          setProcessedCount(currentCount + countInCurrentBatch);
          io.emit("scrapeDetails", {
            total: totalCount,
            processed: countInCurrentBatch + currentCount,
            movie: { title: movieInfo.movieName, success: !!addedMovie, retryCount: retryCount },
          });
        } catch (error) {
          Logger.error(`Error processing movie: ${movieInfo.movieName}, Error: ${error.message}`);
          Logger.info(`Retry count for movie: ${movieInfo.movieId} is ${retryCount}`);

          setProcessedCount(currentCount + countInCurrentBatch);
          io.emit("scrapeDetails", {
            total: totalCount,
            processed: countInCurrentBatch + currentCount,
            movie: { title: movieInfo.movieName, success: false, retryCount: retryCount },
          });

          try {
            let movieObjectId = new mongoose.Types.ObjectId(movieInfo.movieId);
            if (retryCount == RETRY_ATTEMPTS - 1) {
              await Movie.findByIdAndUpdate(movieObjectId, { $set: { failedDuringScrape: true } }, { new: true });
            }
          } catch (castError) {
            Logger.error(`Failed to update failedDuringScrape: ${castError.message}`);
          }

          retryCount++;
        }
      }
    }
  } catch (error) {
    Logger.error(`error in browser: ${JSON.stringify(error.message)}`);

    if (error.name === "ProtocolError" || error.name === "TargetCloseError") {
      Logger.warn(`${error.name}, relaunching browser...`);
      await initBrowser();
      pageInstanceForMultiple = await browser.newPage();
    }
  } finally {
    let processed = countInCurrentBatch + currentCount;
    if (processed >= totalCount || BATCH_SIZE * batchCount >= totalCount) {
      await closeBrowser();
    }
  }
}

async function scrapeSingleMovieDetails({ _page, url }) {
  let browserInitializedLocally = false;

  if (!browser) {
    await initBrowser();
    browserInitializedLocally = true;
  }

  let page;

  try {
    if (!_page) {
      page = await browser.newPage();
      await page.setExtraHTTPHeaders({
        "Accept-Language": "en-US,en;q=0.9",
      });
      await page.setUserAgent("Mozilla/5.0 ... Chrome/66.0.3359.181 Safari/537.36");
      await page.setViewport({ width: 1366, height: 768 });
      await page.goto(url, {
        waitUntil: ["domcontentloaded", "networkidle2", "load"],
      });
    } else if (_page instanceof puppeteer.Page) {
      page = _page;
    }

    const movieDetails = await page.$eval("body", (body) => {
      const title = body.querySelector('main h1[kind="h1"]')?.textContent.trim();
      const duration = body.querySelector('main div span[duration]')?.textContent.trim();
      const genreText = body.querySelector('main div a[href*="/movies/genre"] p')?.textContent.trim();
      const fullDescription = body.querySelector('main div[data-testid="read-more-text-container"] p')?.textContent.trim();
      const ageRating = body.querySelector('main div a[href*="/movies/genre"] + div + p + div + p')?.textContent.trim();
      const yearOfReleaseParent = body.querySelector('main div a[href*="/movies/genre"]')?.parentElement;
      let yearOfRelease = '';
      if(!yearOfReleaseParent) {
        yearOfRelease = body.querySelector('main a[href*="/year"]')?.textContent.trim();
      } else {
        yearOfRelease = yearOfReleaseParent.children[0]?.textContent.trim();
      }
      const imageUrl = body.querySelector('main picture img[alt*="Poster"]')?.src || "";
      const largestImageUrl = body.querySelector('main picture img[alt*="Backdrop"]')?.src || "";
      const genre = genreText ? genreText.split(' / ').map(g => g.trim()) : [];
      const trailerUrl = body.querySelector('iframe')?.href
      return {
        title,
        description: fullDescription,
        imageUrl,
        largestImageUrl,
        ageRating,
        genre,
        yearOfRelease,
        duration,
        trailerUrl
      };
    });

    return movieDetails;
  } catch (error) {
    Logger.error(`Error scraping movie details: ${error.message}`);
    return {};
  } finally {
    if (!_page) {
      await page.close();
    }
    if (browserInitializedLocally) {
      await closeBrowser();
    }
  }
}

async function searchAndScrapeMovie(page, movieName, movieYear) {
    try {
      // Clear any pre-filled text in the search input
      const isInputFilled = await page.$eval('#quick-search-input', (input) => input.value.trim() !== "");
      if (isInputFilled) {
        await page.$eval('#quick-search-input', (input) => (input.value = ""));
      }
  
      // Type the movie name and year into the search input
      await page.type('#quick-search-input', `${movieName} ${movieYear}`);
      await page.keyboard.press('Enter'); // Trigger the search
  
      // Wait for the dropdown results to load
      await new Promise(resolve => setTimeout(resolve, 1500));
  
      // Wait for the dropdown results to appear
      await page.waitForSelector('ul > li.ac-item-hover', { timeout: 60 * 1000 });
  
      // Extract the dropdown results
      const resultLinks = await page.$$eval('.ac-results ul > li a', (links) =>
        links.map((link) => ({
          title: link.querySelector('span').textContent,
          href: link.getAttribute("href"),
          year: link.querySelector('p').textContent
        }))
      );
  
      if (resultLinks.length === 0) {
        throw new Error("No results found in the search.");
      }
  
      Logger.info(`Found ${resultLinks.length} results for ${movieName}`);
  
      // Find the matching result
      const matchingResult = resultLinks.find((link) => {
        const sanitizedTitle = link.title.replace(/[^\w\s]/gi, "").toLowerCase();
        const sanitizedMovieName = movieName.replace(/[^\w\s]/gi, "").toLowerCase();
        const allWordsIncluded = sanitizedMovieName.split(" ").every((word) => sanitizedTitle.includes(word));
        const matchesYear = link.year.includes(movieYear);

        return allWordsIncluded && matchesYear;
      });
  
      if (!matchingResult) {
        Logger.error(`No matching result found for ${movieName} (${movieYear})`);
        throw new Error("No matching result found.");
      }
  
      // Navigate to the matched movie's page
      await Promise.all([
        page.waitForNavigation({ waitUntil: ["domcontentloaded", "load", "networkidle2"], timeout: 60 * 1000 * 2 }),
        page.goto(matchingResult.href),
      ]);
  
      await checkPageIsReady(page);
      await page.waitForSelector("#movie-info", { timeout: 60 * 1000 * 2 });
  
      // Scrape the movie details
      const movieDetails = await scrapeMovieDetails({ _page: page });
  
      return movieDetails;
    } catch (error) {
      Logger.error(`Error searching and scraping movie: ${error.message}`);
      throw error;
    }
  }
  

module.exports = {
  scrapeMovieDetails,
  searchAndScrapeMovies,
  scrapeSingleMovieDetails
};
