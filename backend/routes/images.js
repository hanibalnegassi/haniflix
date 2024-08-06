const router = require("express").Router();
const verify = require("../middleware/verifyToken");
const isAdmin = require("../middleware/isAdmin");

const imageController = require("../controllers/upload");
const avatarController = require("../controllers/upload/avatar");

const { upload, compressAvatar } = require("../middleware/imageMiddlewares");

//CREATE
router.post(
  "/upload",
  verify,
  upload.array("images"),
  compressAvatar,
  imageController.uploadFile
);

//DELETE
router.delete("/avatar/:id", isAdmin, avatarController.deleteAvatar);
//delete image
router.delete("/:id", isAdmin, imageController.deleteImage);

//GET ALL
router.get("/avatar", verify, avatarController.getAllAvatars);
//
router.get("/avatar", verify, imageController.getAllimages);

// get by id
router.get("/avatar/:id", verify, avatarController.getAvatarById);
//serve file
router.get("/avatar/static/:filename", avatarController.serveAvatarFile);

module.exports = router;
