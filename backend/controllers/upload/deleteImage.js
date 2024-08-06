const isAdmin = require("../../middleware/isAdmin");
const Image = require("../../models/Image");
const fs = require("fs");
const path = require("path");

const deleteImage = async (req, res) => {
  const id = req.params.id;
  // Handle deletion logic here
  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Delete the file from the server
    const filePath = path.join(__dirname, "uploads", "images", image.filename);
    fs.unlinkSync(filePath);

    // Delete the image document from the database
    await image.findByIdAndDelete(id);

    res.json({ message: `image ${id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = deleteImage;
