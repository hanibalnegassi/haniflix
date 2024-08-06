const User = require("../../models/User");
const CryptoJS = require("crypto-js");

const createUser = async (req, res) => {
  if (req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }
    const newUser = new User(req.body);
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
};

module.exports = createUser;
