const { Movie } = require("../../models");
const Genre = require("../../models/Genre");

const _ = require("lodash");

const updateMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      console.log("req.body ", req.body);

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

      const newFields = {
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
        genre: genreIds,
        isSeries,
      };

      let updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: newFields,
        },
        { new: true }
      );

      const {
        imgSm: dummyImgSm,
        limit: dummyLimit,
        trailer: dummyTrailer,
        isSeries: dummyIseries, // affects lodash .every() check
        ...fieldsToCheck
      } = newFields;

      // Check if any field is an empty string
      const areFieldsNotEmpty = _.every(fieldsToCheck, (field) => {
        return !_.isEmpty(field);
      });

      // Check if the genre field is an array and has more than 1 item
      const isGenreValid =
        _.isArray(fieldsToCheck.genre) && fieldsToCheck.genre.length > 1;

      if (areFieldsNotEmpty && isGenreValid) {
        updatedMovie = await Movie.findByIdAndUpdate(updatedMovie._id, {
          $unset: { failedDuringScrape: "" },
        });
      }

      // console.log("updatedMovie ", updatedMovie);

      res.status(200).json(updatedMovie);
    } catch (err) {
      console.log("err ", err);
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
};

module.exports = updateMovie;
