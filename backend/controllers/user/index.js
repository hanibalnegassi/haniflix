const getUserById = require("./getUserById");
const getAllUsers = require("./getAllUsers");
const createUser = require("./createUser");
const deleteUser = require("./deleteUser");
const updateUser = require("./updateUser");

const getStats = require("./getStats");
const updatePassword = require("./updatePassword");
const updateUserDetails = require("./updateUserDetails");
const cancelSubscription = require("./cancelSubscription");

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getStats,
  updatePassword,
  updateUserDetails,
  cancelSubscription,
};
