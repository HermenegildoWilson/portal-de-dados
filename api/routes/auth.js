/**
 * @description MIDLEWARE DE AUTENTICAÇÃODE ROTAS, PARA ASSEGURAR O ACESSO A ROTAS PROTEGIDAS, E CONTROLE DE PREVILÉGIOS
 */
const AuthMiddleware = require("../middlewares/auth");

/**
 * @description OBJECTO DE ROTEAMENTO 
 */
const authRouter = require("express").Router();

authRouter.post("/session", AuthMiddleware.refreshAccess);

module.exports = { authRouter };