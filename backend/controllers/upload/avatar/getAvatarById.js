const Avatar = require("../../../models/Avatar");

const getAvatarById = async (req, res) => {
  try {
    const id = req.params.id;

    const avatar = await Avatar.findById(id);
    if (!avatar) {
      return res.status(404).json({ error: "Avatar not found" });
    }

    res.json({ avatar });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = getAvatarById;
