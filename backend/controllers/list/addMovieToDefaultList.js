const { List } = require("../../models");
const User = require("../../models/User");

const addMovieToDefaultList = async (req, res) => {
  try {
    const movieId = req.body.movieId; // Assuming you receive the movie ID from the client

    const user = await User.findOne({ _id: req.user.id });

    if (!user) {
      return res.status(404).json("User not found");
    }

    let defaultList;

    if (user.defaultList == null) {
      defaultList = await createDefaultList(user);
    } else {
      defaultList = await List.findOne({
        _id: user.defaultList,
        // user: user._id, // Match the user's ID
      });
    }

    if (!defaultList) {
      defaultList = await createDefaultList(user);
      // return res.status(404).json("Default list not found for the user");
    }

    // Add the movie ID to the default list's content array
    if (defaultList.content.includes(movieId)) {
      //remove if its already present
      let newContent = [...defaultList.content];

      newContent = newContent.filter((_movieId) => _movieId != movieId);
      defaultList.content = newContent;
    } else {
      // only add if it is not yet in the list
      defaultList.content.push(movieId);
    }

    // Save the updated default list
    const updatedDefaultList = await defaultList.save();

    res.status(200).json(updatedDefaultList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createDefaultList = async function (user) {
  let list = new List({
    title: `${user.username}'s Watchlist`,
    user: user._id,
  });
  list = await list.save();
  user.defaultList = list._id;
  await user.save();
  return list;
};

module.exports = addMovieToDefaultList;
