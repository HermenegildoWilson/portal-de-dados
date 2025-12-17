const AuthController = require("./auth.controller");

const authRouter = require("express").Router();

authRouter.post("/session", AuthController.refreshAccess);

module.exports = { authRouter };