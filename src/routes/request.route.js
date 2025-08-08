const express = require("express");
const { userAuth } = require("../middlewares/auth.middleware");
const { sendConnectionRequestController } = require("../controllers/request.controller");


const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth,sendConnectionRequestController )

module.exports = requestRouter;
