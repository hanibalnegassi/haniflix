const router = require("express").Router();
const isAdmin = require("../middleware/isAdmin");

const miscController = require("../controllers/misc");

//SYNC
router.post(
  "/sync-movies-to-db",
  isAdmin,
  miscController.syncServerMoviesToDatabase
);

module.exports = router;
