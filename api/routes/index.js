/**
 * @description MIDLEWARE DE AUTENTICAÇÃODE ROTAS, PARA ASSEGURAR O ACESSO A ROTAS PROTEGIDAS, E CONTROLE DE PREVILÉGIOS
 */
const AuthMiddleware = require("../middlewares/auth");

/**
 * @description OBJECTO DE ROTEAMENTO
 */
const router = require("express").Router();

/**
 * @description INTEGRAÇÃO DO ROUTER DE AUTENTICAÇÃO
 */
const { authRouter } = require("./auth");
router.use("/auth", authRouter);

/**
 * @description INTEGRAÇÃO DO ROUTER DE USUÁRIO
 */
const { userRouter } = require("./user");
router.use("/", userRouter);

module.exports = { router };
