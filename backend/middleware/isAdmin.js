const verify = require("./verifyToken");

function isAdmin(req, res, next) {
  verify(req, res, () => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .json({ message: "You are not authorized to access this resource" });
    }
  });
}

module.exports = isAdmin;
