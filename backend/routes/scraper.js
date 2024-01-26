const router = require("express").Router();
const puppeteer = require("puppeteer");

const verify = require("../verifyToken");

//CREATE
router.post("/scrape", verify, async (req, res) => {
  try {
    console.log("req.body ", req.body);

    const movieUrl = req.body.url;

    console.log("movieUrl ", movieUrl);

    const movieDetails = await scrapeMovieDetails(movieUrl);

    res.status(200).json(movieDetails);
  } catch (err) {
    console.log("error ", err);

    res.status(500).json(err);
  }
});

async function scrapeMovieDetails(url) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.9",
  });
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
  );
  await page.goto(url, { waitUntil: "domcontentloaded" });

  try {
    const movieDetails = await page.$eval("body", (body) => {
      const yearOfRelease = body.querySelector(
        ".css-n6mjxq.e1r3wknn10"
      ).textContent;
      const title = body.querySelector(".css-xuu3cf.e3sx6uc7").textContent;
      const description = body.querySelector(
        ".css-49lcwn.e1qij4j11 p"
      ).textContent;
      const ageRating = body
        .querySelector('span[title="Maturity rating"]')
        .textContent.trim();
      let genre = Array.from(
        body.querySelectorAll(".css-1szmslw.e1r3wknn1 a")
      ).map((link) => link.textContent);
      const duration = body.querySelector(
        ".css-1szmslw.e1r3wknn1:last-child"
      ).textContent;

      //last item is not a genre
      genre = genre.slice(0, -1);

      const imageSources = Array.from(body.querySelectorAll("picture source"));
      const largestImageUrl = imageSources.reduce(
        (largest, source) => {
          const currentSize = parseInt(
            source.getAttribute("srcset").split(" ")[1]
          );
          return currentSize > largest.size
            ? { srcset: source.getAttribute("srcset"), size: currentSize }
            : largest;
        },
        { srcset: "", size: 0 }
      ).srcset;

      return {
        title,
        description,
        trailerUrl: "", // Replace with trailer extraction logic if needed
        imageUrl: largestImageUrl.split(" ")[0], // Get the actual URL from srcset
        ageRating,
        genre,
        yearOfRelease,
        duration,
      };
    });

    // Return the extracted data
    return movieDetails;
  } catch (error) {
    console.error("Error scraping movie details:", error);
    return {};
  } finally {
    await browser.close();
  }
}

module.exports = router;