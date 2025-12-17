/**
 * @description MIDLEWARE DE AUTENTICAÇÃODE ROTAS, PARA ASSEGURAR O ACESSO A ROTAS PROTEGIDAS, E CONTROLE DE PREVILÉGIOS
 */
const AuthMiddleware = require("../../shared/middlewares/auth.middleware");

/**
 * @description OBJECTO DE CONTROLLERS
 */
const userControllers = require("./user.controller");

/**
 * @description OBJECTO DE ROTEAMENTO
 */
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
