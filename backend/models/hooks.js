const mongoose = require("mongoose");

// const Movie = require("./Movie");
const Genre = require("./Genre");
// const List = require("./List");

const Logger = require("../lib/logger");

function arraysAreEqual(array1, array2) {
  // Check if both arrays have the same length
  if (array1.length !== array2.length) {
    return false;
  }

  // Check if every element in array1 is included in array2
  return array1.every((element) => array2.includes(element));
}

/**
 * Add hooks to models.
 * @param {Object} params - Parameters object.
 * @param {import('mongoose').Model} params.Genre - Genre model.
 * @param {import('mongoose').Schema} params.MovieSchema - Movie schema.
 * @param {import('mongoose').Schema} params.ListSchema - List schema.
 */
const addHooks = ({ MovieSchema, ListSchema }) => {
  ListSchema.pre(["save", "findOneAndUpdate"], async function () {
    try {
      // Retrieve the previous state of the document from the database
      if (this.isNew) {
        this._previousState = null; // If it's a new document, set previous state to null
      } else {
        if (this.findOne && this.getFilter) {
          const docToUpdate = await this.findOne(this.getFilter());
          this._previousState = docToUpdate.toObject();
        }
      }
    } catch (error) {
      console.error("Error retrieving previous state:", error);
    }
  });

  // Listener to add movies to lists based on list title changes
  ListSchema.post(["save", "findOneAndUpdate"], async function (list) {
    try {
      const previousState = this._previousState;

      // console.log("this ", this);

      if (previousState === undefined) {
        return;
      }
      if (previousState == null) {
        return;
      }

      // Only proceed if the list title has been modified
      const newTitle = list.title.toLowerCase()?.trim();
      const oldTitle = previousState?.title?.toLowerCase()?.trim();

      if (oldTitle !== newTitle) {
        // Find movies with genres matching the list title
        const listTitleLowercase = list.title.toLowerCase()?.trim();
        const genres = await Genre.find({ title: listTitleLowercase });
        const genreIds = genres.map((genre) => genre._id);

        //generate new model to use in hook
        const Movie = mongoose.model("Movie", MovieSchema);

        const moviesToAdd = await Movie.find({
          genre: { $in: genreIds },
        });
        // Add movies to list content and automaticallyAdded fields
        for (const movie of moviesToAdd) {
          if (!list.content.includes(movie._id)) {
            list.content.push(movie._id);
            list.automaticallyAdded.push(movie._id);
          }
        }

        // Save the updated list
        await list.save();
      }
    } catch (error) {
      console.error("Error updating list in Listener:", error);
    }
  });

  // Listener to add or remove movies from lists based on genre changes
  MovieSchema.post(["save", "findOneAndUpdate"], async function (movie) {
    try {
      const populatedMovie = await movie.populate("genre").execPopulate();

      const genresTitles = populatedMovie.genre.map((genre) => genre.title);

      //generate new model to use in hook
      const List = mongoose.model("List", ListSchema);

      const lists = await List.find({
        title: { $in: genresTitles.map((title) => new RegExp(title, "i")) },
      });

      // Add movie to lists
      for (const list of lists) {
        if (!list.content.includes(movie._id)) {
          list.content.push(movie._id);
          list.automaticallyAdded.push(movie._id);
          await list.save();
        }
      }

      //all lists where this movie is no longer a part of based on genre-list match
      // Remove movie from lists where list where movie genres no longer match the list
      const removedLists = await List.find({
        title: { $nin: genresTitles.map((title) => new RegExp(title, "i")) },
      });

      for (const list of removedLists) {
        if (list.automaticallyAdded.includes(movie._id)) {
          const index = list.content.indexOf(movie._id);
          if (index !== -1) {
            list.content.splice(index, 1);
            list.automaticallyAdded.pull(movie._id);
            await list.save();
          }
        }
      }
    } catch (error) {
      console.error("Error updating lists in hook:", error);
      Logger.error("Error updating lists in hook:" + JSON.stringify(error));
    }
  });

  // Listener to remove movie from lists when it's deleted
  MovieSchema.post("findOneAndDelete", async function (movie) {
    try {
      //generate new model to use in hook
      const List = mongoose.model("List", ListSchema);

      await List.updateMany(
        { content: movie._id },
        { $pull: { content: movie._id, automaticallyAdded: movie._id } }
      );
    } catch (error) {
      console.error("Error removing movie from lists:", error);
      Logger.error("Error removing movie from lists:", error);
    }
  });

  return {
    MovieSchema,
    ListSchema,
  };
};

module.exports = { addHooks };
