const { Movie } = require("../../models");
const Genre = require("../../models/Genre");

const _ = require("lodash");

const createMovie = async (req, res) => {
  try {
    if (req.user) {
      if (!req.user.isAdmin) {
        res.status(400).send({
          message: "Unauthorized ",
        });
        return;
      }

      const params = _.pick(req.body, [
        "title",
        "desc",
        "img",
        "imgTitle",
        "imgSm",
        "trailer",
        "ageRating",
        "duration",
        "video",
        "year",
        "limit",
        "genre",
        "isSeries",
      ]);

      const {
        title,
        desc,
        img,
        imgTitle,
        imgSm,
        trailer,
        ageRating,
        duration,
        video,
        year,
        limit,
        genre,
        isSeries,
      } = params;

      let genreIds = [];

      if (Array.isArray(genre)) {
        for (let itemIndex = 0; itemIndex < genre.length; itemIndex++) {
          const genreItem = genre[itemIndex];
          //genreItem can be obj for {new} or _id for already existing

          //uncreated
          if (genreItem.type === "new") {
            const genreTitle = genreItem.title?.toLowerCase();

            //can only be reached in a hypothetical case (debugging)
            const findGenreMatch = await Genre.findOne({
              title: genreTitle,
            });

            if (findGenreMatch) {
              // already stored in db
              genreIds.push(findGenreMatch._id);
              continue;
            }

            //create new genre, if none is found
            const newGenre = new Genre({ title: genreTitle });

            const savedGenre = await newGenre.save();
            genreIds.push(savedGenre._id); // Assuming _id is the generated ID
            //
          } else {
            // therefore genreItem is an _id
            const findGenreMatch = await Genre.findOne({
              _id: genreItem,
            });

            if (findGenreMatch) {
              // already stored in db
              genreIds.push(findGenreMatch._id);
              continue;
            }
          }
        }
      }

      const newMovie = new Movie({
        title,
        desc,
        img,
        imgTitle,
        imgSm,
        trailer,
        ageRating,
        duration,
        video,
        year,
        limit,
        isSeries,
        genre: genreIds,
      });

      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } else {
      res.status(403).json("You are not allowed!");
    }
  } catch (err) {
    console.log("err ", err);
    res.status(500).json(err);
  }
};

module.exports = createMovie;
