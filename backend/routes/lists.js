const router = require("express").Router();
const List = require("../models/List");
const verify = require("../middleware/verifyToken");

const _ = require("lodash");

const listControllers = require("../controllers/list");

//CREATE
router.post("/", verify, listControllers.createList);

//UPDATE
router.put("/:id", verify, listControllers.updateList);

//DELETE
router.delete("/:id", verify, listControllers.deleteList);

//GET
router.get("/", verify, listControllers.getLists);
//
router.get("/single/:id", verify, listControllers.getListById);

router.get("/admin-list", verify, listControllers.getAdminLists);

//continue watching
router.get(
  "/continue-watching-list",
  verify,
  listControllers.getContinueWatching
);

// router.get("/my-list/:email", verify,async (req, res) => {
router.get("/my-list", verify, listControllers.getMyLists);

router.post(
  "/add-movie-to-default-list",
  verify,
  listControllers.addMovieToDefaultList
);

module.exports = router;
