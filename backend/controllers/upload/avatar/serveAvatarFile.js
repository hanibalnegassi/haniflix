const Avatar = require("../../../models/Avatar");

const path = require("path");
const fs = require("fs");

const serveAvatarFile = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, "../../../uploads/avatars", filename);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ error: "Avatar not found" });
      }

      // Serve the file
      res.sendFile(filePath);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = serveAvatarFile;
