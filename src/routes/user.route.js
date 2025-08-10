const express = require("express");
const { userAuth } = require("../middlewares/auth.middleware");
const { userRequestsController, userConnectionsController, feedController } = require("../controllers/user.controller");


const userRouter = express.Router();

userRouter.get("/user/requests/received",userAuth,userRequestsController);
userRouter.get("/user/connections",userAuth,userConnectionsController);
userRouter.get("/feed",userAuth,feedController);

module.exports =  userRouter;