const isAdmin = require("../../../middleware/isAdmin");
const Avatar = require("../../../models/Avatar");
const fs = require("fs");
const path = require("path");

const deleteAvatar = async (req, res) => {
  const id = req.params.id;
  // Handle deletion logic here
  try {
    const avatar = await Avatar.findById(id);
    if (!avatar) {
      return res.status(404).json({ error: "Avatar not found" });
    }

    // Delete the file from the server
    const filePath = path.join(
      __dirname,
      "../../../uploads/avatars",
      avatar.filename
    );

    fs.unlinkSync(filePath);

    // Delete the avatar document from the database
    await Avatar.findByIdAndDelete(id);

    res.json({ message: `Avatar ${id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = deleteAvatar;
