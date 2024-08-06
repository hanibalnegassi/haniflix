const router = require("express").Router();
const verify = require("../middleware/verifyToken");

const genreController = require("../controllers/genre");

//CREATE
router.post("/", verify, genreController.createGenre);

//DELETE
router.delete("/:id", verify, genreController.deleteGenre);

//GET ALL
router.get("/", verify, genreController.getGenres);

module.exports = router;
