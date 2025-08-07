const express = require("express");
const { registerUserController, loginUserController } = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/signup", registerUserController)
authRouter.post("/login", loginUserController)

module.exports =  authRouter;