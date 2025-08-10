const express = require("express");
const { userAuth } = require("../middlewares/auth.middleware");
const { sendConnectionRequestController, reviewConnectionRequestController } = require("../controllers/request.controller");


const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth,sendConnectionRequestController )
requestRouter.post("/request/review/:status/:requestId", userAuth,reviewConnectionRequestController )

module.exports = requestRouter;
