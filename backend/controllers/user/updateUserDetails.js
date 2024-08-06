const User = require("../../models/User");

const updateUserDetails = async (req, res) => {
  if (req.body.id === req.params.id) {
    try {
      // Update user details, excluding password
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            // username: req.body.email,
            email: req.body.email,
          },
        },
        { new: true }
      );
      const { password, ...info } = updatedUser._doc;
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only your account!");
  }
};

module.exports = updateUserDetails;
