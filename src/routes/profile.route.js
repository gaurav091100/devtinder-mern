const express = require("express");
const { getProfileDetailsController, editProfileController } = require("../controllers/profile.controller");
const { userAuth } = require("../middlewares/auth.middleware");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, getProfileDetailsController)
profileRouter.patch("/profile/edit", userAuth, editProfileController)



module.exports = profileRouter;