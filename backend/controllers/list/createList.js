const { List, Movie } = require("../../models");
const User = require("../../models/User");
const Genre = require("../../models/Genre");

const _ = require("lodash");

const addMoviesFromGenreToList = async (list) => {
  // Find movies with genres matching the list title
  const listTitleLowercase = list.title.toLowerCase()?.trim();
  const genres = await Genre.find({ title: listTitleLowercase });
  const genreIds = genres.map((genre) => genre._id);

  let content = list.content ? [...list.content] : [];
  let automaticallyAdded = [];

  const moviesToAdd = await Movie.find({
    genre: { $in: genreIds },
  });

  // Add movies to list content and automaticallyAdded fields
  for (const movie of moviesToAdd) {
    if (list.content && !list.content.includes(movie._id)) {
      content.push(movie._id);
      automaticallyAdded.push(movie._id);
    }

    // if (!list?.content || list?.content?.length == 0) {
    //   content.push(movie._id);
    //   automaticallyAdded.push(movie._id);
    // }
  }
  // console.log("content  ", content);
  // console.log("automaticallyAdded  ", automaticallyAdded);
  content = _.uniq(content);
  automaticallyAdded = _.uniq(automaticallyAdded);

  return {
    content,
    automaticallyAdded,
  };
};

const createList = async (req, res) => {
  try {
    // Find the user by their email address
    // const user = await User.findOne({ email: req.body.email });
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json("User not found");
    }

    const myList = {
      user: user._id,
      title: req.body.title,
      content: req.body.content,
      type: req.body.type,
      genre: req.body.genre,
      adminList: user.isAdmin,
    };

    // Create a new list
    let newList = new List(myList);

    // Set the user for the new list
    newList.user = user;

    const { content, automaticallyAdded } = await addMoviesFromGenreToList(
      newList
    );

    newList["content"] = content;
    newList["automaticallyAdded"] = automaticallyAdded;

    // Save the new list
    const savedList = await newList.save();

    // Update the user's lists array with the newly created list's ObjectId
    user.lists.push(savedList._id);

    // Save the updated user
    await user.save();

    res.status(201).json(savedList);
  } catch (err) {
    console.log("err ", err);
    res.status(500).json(err);
  }
};

module.exports = createList;
