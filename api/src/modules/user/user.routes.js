const AuthMiddleware = require("../../shared/middlewares/auth.middleware");

const userControllers = require("./user.controller");

const userRouter = require("express").Router();

userRouter.post("/cadastrar/:registerKey", userControllers.cadastrar);

userRouter.post("/login", userControllers.login);

userRouter.post(
    "/logout",
    AuthMiddleware.authanticateAccess,
    userControllers.logout
);

userRouter.post(
    "/generatekeyregister",
    AuthMiddleware.authanticateAccess,
    AuthMiddleware.verifyRole(["admin"]),
    userControllers.generateKeyRegister
);

module.exports = { userRouter };
