const { ListSchema: rawListSchema } = require("./List");
const { MovieSchema: rawMovieSchema } = require("./Movie");
// const Genre = require("./Genre");

const mongoose = require("mongoose");

const { addHooks } = require("./hooks");

const { ListSchema, MovieSchema } = addHooks({
  ListSchema: rawListSchema,
  MovieSchema: rawMovieSchema,
});

const Movie = mongoose.model("Movie", MovieSchema);
const List = mongoose.model("List", ListSchema);

module.exports = {
  List,
  Movie,
};
