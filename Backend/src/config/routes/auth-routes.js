const express = require("express");
const middleware = require("../../middlewares/auth-middleware");
const authRouter = express.Router();
const authController = require("../controllers/auth-controller");

authRouter.post("/register", authController.registerUserController);

authRouter.post("/login", authController.loginUserController);
module.exports = authRouter;
