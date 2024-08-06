const { List } = require("../../models");
const User = require("../../models/User");

const updateList = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user?.email) {
    try {
      // Find the user by their email address
      // const user = await User.findOne({ email: req.body.email });
      const list = await List.findById(req.params.id);

      if (user._id == list._id || user.isAdmin) {
        const updatedList = await List.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              title: req.body.title,
              content: req.body.content,
              type: req.body.type,
              genre: req.body.genre,
            },
          },
          { new: true }
        );

        return res.status(200).json(updatedList);
      }
      return res.status(401).json("Unauthorized");

      /* const myList = {
          user: user._id,
          title: req.body.title,
          content: req.body.content,
          type: req.body.type,
          genre: req.body.genre,
        };

        // Create a new list
        const newList = new List(myList);

        // Set the user for the new list
        newList.user = user;

        // Save the new list
        const savedList = await newList.save();

        // Update the user's lists array with the newly created list's ObjectId
        user.lists.push(savedList._id);

        // Save the updated user
        await user.save();

        res.status(201).json(savedList);*/
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
};

module.exports = updateList;
