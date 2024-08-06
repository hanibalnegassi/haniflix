const Image = require("../../models/Image");

const getAllimages = async (req, res) => {
  // Handle fetching avatar logic here
  try {
    const images = await Image.find({});
    res.json({
      images,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = getAllimages;
