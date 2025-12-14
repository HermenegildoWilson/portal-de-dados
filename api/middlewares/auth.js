const jwt = require("jsonwebtoken");

/**
 * @description MODEL DE ITERAÇÃO COM A TABELA TOKENS
 */
const { token_model } = require("../models");

const { authServices } = require("../services");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;

class AutenticacaoMiddleware {
    /**
     *@description Autenticação de acesso a rotas protegidas
     *@route /auth/acces
     */
    authanticateAccess = (req, res, next) => {
        const access_token = req.headers["authorization"]?.split(" ")[1];
        const refresh_token = req.cookies.refresh_token;
        // SE NÃO TIVER UM TOKEN DE ACESSO
        console.log(access_token);
        
        if (!access_token) {
            return res.status(401).json({
                status: 401,
                success: false,
                message: "Início de seção necessário!",
            });
        }

        // SETIVER UM TOKEN DE ACESSO, VERIFICAMO-LO COM A CHAVE.
        jwt.verify(access_token, ACCESS_TOKEN_SECRET, (err, user) => {
            //SE O TOKEN DE ACESSO TIVER EXPIRADO, avismos que o token espirou
            if (err) {
                return res.status(401).json({
                    status: 401,
                    success: false,
                    message: "Token inválido!",
                });
            }

            // SE O TOKEN DE ACESSO ESTIVER EM DIA, ENTÃO OK.
            req.user = user.payload;
            return next();
        });
    };

    /**
     *
     * @param {Object} roles - Array contendo os roles (permissões) dque é recessária para acessar esta rota
     *@description Autenticação de acesso a rotas protegidas, verificação do role
     */
    verifyRole = (roles = []) => {
        return (req, res, next) => {
            const userRole = req?.user?.role;

            if (!userRole) {
                return res.status(403).json({
                    status: 403,
                    success: false,
                    message: "Acesso negado!",
                });
            }
            const isAuth = roles.some((v) => v === userRole);
            if (isAuth) {
                return next();
            }

            return res.status(403).json({
                status: 403,
                success: false,
                message: "Acesso negado!",
            });
        };
    };

    /**
     *
     * @param {Object} roles - Array contendo os roles (permissões) dque é recessária para acessar esta rota
     *@description Autenticação de acesso a rotas protegidas, verificação do role
     */
    verifyApiKey = (API_TOKEN_SECRET) => {
        return (req, res, next) => {
            const access_token = req.headers["authorization"]?.split(" ")[1];
            const refresh_token = req.cookies.refresh_token;
            // SE NÃO TIVER UM TOKEN DE ACESSO
            if (!access_token) {
                // SE NÃO TIVER UM TOKEN DE REFRESCO, FAÇA LOGIN
                if (!refresh_token) {
                    return res.status(403).json({
                        status: 403,
                        success: false,
                        message: "Início de seção necessário!",
                    });
                }

                return res.status(401).json({
                    status: 401,
                    success: false,
                    message: "Seção expirada.",
                });
            }

            // SETIVER UM TOKEN DE ACESSO, VERIFICAMO-LO COM A CHAVE.
            jwt.verify(access_token, ACCESS_TOKEN_SECRET, (err, user) => {
                //SE O TOKEN DE ACESSO TIVER EXPIRADO, avismos que o token espirou
                if (err) {
                    return res.status(401).json({
                        status: 401,
                        success: false,
                        message: "Token inválido!",
                    });
                }

                // SE O TOKEN DE ACESSO ESTIVER EM DIA, ENTÃO OK.
                req.user = user.payload;
                return next();
            });
        };
    };

    /**
     *@description Autenticação de acesso
     *@route /auth/session
     */
    refreshAccess = async (req, res) => {
        const refresh_token = req.cookies.refresh_token;

        // SE NÃO TIVER UM TOKEN DE REFRESCO, FAÇA LOGIN
        if (!refresh_token) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Sua sessão expitou faça login...",
            });
        }

        // SETIVER UM TOKEN DE REFRESCO, VERIFICAMO-LO COM A CHAVE.
        jwt.verify(refresh_token, REFRESH_TOKEN_SECRET, async (err, user) => {
            //SE O TOKEN DE REFRESCO TIVER EXPIRADO, FAÇA LOGIN
            if (err) {
                return res.status(403).json({
                    status: 403,
                    success: false,
                    message: "Sua sessão expitou faça login...",
                });
            }

            // SE O TOKEN DE REFRESCO ESTIVER EM DIA, ENTÃO VERIFICAMOS SE EXISTE NO BANCO.
            const refresh_token_exist = await token_model.selectOne({
                refresh_token: refresh_token,
            });
            if (!refresh_token_exist) {
                return res.status(403).json({
                    status: 403,
                    success: false,
                    message: "Sua sessão expitou faça login...",
                });
            }

            //SE TUDO ESTÁ OK, ENTÃO GERAMOS UM NOVO TOKEN DE ACESSO
            const ACCESS_TOKEN = await authServices.createToken(
                user.payload,
                ACCESS_TOKEN_SECRET,
                ACCESS_TOKEN_EXPIRATION
            );

            return res.status(200).json({
                status: 200,
                success: true,
                user: user.payload,
                access_token: ACCESS_TOKEN,
                message: "Seção restaurada!",
            });
        });
    };
}

module.exports = new AutenticacaoMiddleware();
