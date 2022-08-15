const express = require("express");
const {
  updateUser,
  updateDP,
  getUsers,
  followUser,
} = require("../controllers/user");
const router = express.Router();

router.route("/").get(getUsers).patch(updateUser);
router.route("/dp").patch(updateDP);
router.route("/follow/:id").get(followUser);

module.exports = router;
