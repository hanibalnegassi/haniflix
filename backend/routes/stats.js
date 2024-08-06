const router = require("express").Router();
const verify = require("../middleware/verifyToken");

const statsController = require("../controllers/stats");

//GET ALL
router.get("/admin-dashboard", verify, statsController.getAdminDashboardStats);

module.exports = router;
