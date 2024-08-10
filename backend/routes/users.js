const router = require("express").Router();
const verify = require("../middleware/verifyToken");
const userController = require("../controllers/user");

//CREATE

router.post("/", verify, userController.createUser);

//UPDATE
router.put("/:id", verify, userController.updateUser);

//DELETE
router.delete("/:id", verify, userController.deleteUser);

//CANCEL SUBSCRIPTION
router.put("/cancel-sub/:id", userController.cancelSubscription);

//GET
router.get("/find/:id", verify, userController.getUserById);

//GET ALL
router.get("/", verify, userController.getAllUsers);

//GET USER STATS
router.get("/stats", verify, userController.getStats);

// UPDATE USER DETAILS
router.put("/updateUserDetails/:id", verify, userController.updateUserDetails);

// UPDATE PASSWORD
router.put("/updatePassword/:id", verify, userController.updatePassword);

// router.post('/subscribe', async (req, res) => {
//   try {
//     // Create a customer in Stripe
//     const customer = await stripe.customers.create({
//       email: req.body.email,
//       source: req.body.tokenId, // The token ID obtained from the client-side
//     });

//     // Create a subscription
//     const subscription = await stripe.subscriptions.create({
//       customer: customer.id,
//       items: [{ price: 'price_1OPzRqH7M6091XYpgo612qWG' }], // Replace with your price ID
//     });

//     const user = await User.findOne({ email: req.body.email });
//     user.isSubscribed == true

//     res.status(200).json(subscription);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Subscription failed' });
//   }
// });

module.exports = router;
