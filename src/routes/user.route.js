const express = require("express");
const { userAuth } = require("../middlewares/auth.middleware");
const { userRequestsController, userConnectionsController } = require("../controllers/user.controller");


const userRouter = express.Router();

userRouter.get("/user/requests/received",userAuth,userRequestsController);
userRouter.get("/user/connections",userAuth,userConnectionsController);

module.exports =  userRouter;