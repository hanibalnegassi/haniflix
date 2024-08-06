const User = require("../../models/User");
const CryptoJS = require("crypto-js");

const updatePassword = async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      // Retrieve user from the database
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // Decrypt stored password
      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);

      // Check if current password matches decrypted password
      if (decryptedPassword !== req.body.currentPassword) {
        return res.status(400).json({
          message: "Current password is incorrect",
        });
      }

      // Encrypt new password
      const encryptedPassword = CryptoJS.AES.encrypt(
        req.body.newPassword,
        process.env.SECRET_KEY
      ).toString();

      // Update user password
      await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            password: encryptedPassword,
          },
        },
        { new: true }
      );
      res.status(200).json({
        message: "Password updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({
      message: "You can update only your account!",
    });
  }
};

module.exports = updatePassword;
