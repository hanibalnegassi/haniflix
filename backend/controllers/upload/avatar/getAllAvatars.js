const Avatar = require("../../../models/Avatar");
const fs = require("fs");
const path = require("path");

const getAllAvatars = async (req, res) => {
  // Handle fetching avatar logic here
  try {
    const NODE_ENV = process.env.NODE_ENV;
    // Get all avatars from the database
    const avatarsFromDB = await Avatar.find({
      environment: NODE_ENV,
    });

    // Get all files in the "uploads/avatars" directory
    const avatarFiles = fs.readdirSync(
      path.join(__dirname, "../../../uploads/avatars")
    );

    // Filter avatars from the database based on files present in the directory
    const avatars = avatarsFromDB.filter((avatar) =>
      avatarFiles.includes(avatar.filename)
    );

    // Construct URLs for the avatars
    const avatarURLs = avatars.map((avatar) => ({
      _id: avatar._id,
      filename: avatar.filename,
      mimetype: avatar.mimetype,
      size: avatar.size,
      url: `/api/image/avatar/static/${avatar.filename}`, // Change this path according to your route
    }));

    res.json({
      avatars: avatarURLs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = getAllAvatars;
