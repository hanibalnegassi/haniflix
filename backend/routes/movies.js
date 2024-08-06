const router = require("express").Router();
const verify = require("../middleware/verifyToken");

const moviesController = require("../controllers/movie");

//CREATE
router.post("/", verify, moviesController.createMovie);

//UPDATE
router.put("/:id", verify, moviesController.updateMovie);

//DELETE
router.delete("/:id", verify, moviesController.deleteMovie);

//GET
router.get("/find/:id", verify, moviesController.findMovie);

//GET RANDOM
router.get("/random", verify, moviesController.getRandomMovie);

//GET SINGLE
router.get("/:id", verify, moviesController.getMovieById);  

//GET ALL
router.get("/", verify, moviesController.getMovies);

//Like movie
router.post("/:id/like", verify, moviesController.likeMovie);

//Dislike movie
router.post("/:id/dislike", verify, moviesController.dislikeMovie);

//stream movie
router.get("/stream/:movieId", verify, moviesController.streamMovie);

module.exports = router;
