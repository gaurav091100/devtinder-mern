const express = require("express");
const { getProfileDetailsController } = require("../controllers/profile.controller");
const { userAuth } = require("../middlewares/auth.middleware");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, getProfileDetailsController)



module.exports = profileRouter;