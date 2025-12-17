const jwt = require("jsonwebtoken");

/**
 * @description MODEL DE ITERAÇÃO COM A TABELA TOKENS
 */
const { token_model } = require("../../models");

const authServices = require("./auth.service");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;

class AutenticacaoMiddleware {
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
