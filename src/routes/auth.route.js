const express = require("express");
const { registerUserController, loginUserController, logoutUserController } = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/signup", registerUserController)
authRouter.post("/login", loginUserController)
authRouter.post("/logout", logoutUserController)

module.exports =  authRouter;