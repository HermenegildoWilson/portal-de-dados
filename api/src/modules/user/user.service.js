const argon2 = require("argon2");
const model = require("./user.model");
const env = require("../../config/env");
const { createToken } = require("../auth/auth.service");
const { token_model } = require("../../models/index");

const isProd = process.env.NODE_ENV === "production";
const cookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
};

class userServices {
    /**
     * @description Objecto contendo o novo usuario criado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async cadastrar(usuario) {
        try {
            const responseEmail = await this.verifyUserEmail({
                email: usuario?.email,
                role: usuario?.role,
            });

            if (responseEmail.success) {
                return {
                    success: false,
                    status: 409,
                    message: "Email indisponível!",
                };
            }

            /**
             * @description NESTE TRECHO GERAMOS O HASH DA SENHA A PARTRIR DO Nº DE TELEFONE
             */
            const senhaHash = await this.createHash(usuario.senha);

            const usuario_criado = await model.create({
                nome: usuario.nome,
                email: usuario.email,
                role: usuario.role,
                senha: senhaHash,
            });

            return {
                success: true,
                message: "Cadastro feito com sucesso!",
                user: usuario_criado,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao efeituar cadastro",
                errors: `${error}`,
            };
        }
    }

    /**
     * @description - Objecto contendo o novo usuario criado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async login(credencials, res) {
        try {
            const responseEmail = await this.verifyUserEmail({
                email: credencials.email,
                role: credencials.role,
            });

            if (!responseEmail.success) {
                return {
                    success: false,
                    status: 404,
                    message: "Email inexistente!",
                };
            }

            /**
             * @description NESTE TRECHO VERIFICAMOS SE A SENHA FORNECIDA CORRESPONDE A SENHA DO FUNCIONÁRIO
             */
            const responseSenha = await this.verifyHash(
                responseEmail.data.senha,
                credencials.senha
            );

            if (!responseSenha) {
                return {
                    success: false,
                    status: 404,
                    message: "Senha incorreta!",
                };
            }

            /**
             * @description NESTE TRECHO GERAMOS OS TOKENS {ACCESS E REFRESH}
             */
            const payload = {
                id: responseEmail.data.id,
                email: responseEmail.data.email,
                nome: responseEmail.data.nome,
                role: responseEmail.data.role,
            };

            const ACCESS_TOKEN = await createToken(
                payload,
                env.access_token_secret,
                env.access_token_expiration
            );

            const REFRESH_TOKEN = await createToken(
                payload,
                env.refresh_token_secret,
                env.refresh_token_expiration
            );

            /**
             * @description NESTE TRECHO GURDAMOS O TOKE DE REFRESH NO BANCO DE DADOS
             */
            token_model.create({
                id_usuario: responseEmail.data.id,
                refresh_token: REFRESH_TOKEN,
            });

            res.cookie("refresh_token", REFRESH_TOKEN, {
                ...cookieOptions,
                maxAge: env.cookie_expiration,
            });

            return {
                success: true,
                message: "Seja bem-vindo!",
                user: payload,
                access_token: ACCESS_TOKEN,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao efeituar login",
                errors: `${error}`,
            };
        }
    }

    /**
     * @description Objecto contendo o novo candidato criado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async logout(req, res) {
        try {
            const { user } = req.body;
            const refresh_token = req.cookies.refresh_token;

            token_model.delete({
                refresh_token: refresh_token,
            });

            res.clearCookie("refresh_token", {
                ...cookieOptions,
            });

            return {
                success: true,
                user: user,
                message: "Volte sempre...",
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao fazer logout",
                errors: `${error}`,
            };
        }
    }

    /**
     * @description Retorna true se já existe e false se ele não exite
     */
    async verifyUserEmail({ email, role }) {
        /**
         * @description NESTE TRECHO VERIFICAMOS SE O EMAIL DO usuario ESTÁ DISPONÍVEL
         */
        let usuario_encontrado = await model.selectOne({
            email: email,
        });

        if (!usuario_encontrado) {
            return {
                success: false,
            };
        }

        return {
            success: true,
            data: usuario_encontrado,
        };
    }

    /**
     *
     * @param {String} string - String que desejamos gerar o hash
     * @returns {String} - Palavra hasheada
     */
    async createHash(string) {
        return await argon2.hash(string, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16, // 64 MB
            timeCost: 3, // nº de iterações
            parallelism: 1, // threads
        });
    }

    /**
     * @param {hash} hash - Hash com o qual vmos comparar a string
     * @param {String} string - String que desejamos comparar
     * @returns {Boolean} - true se a String Corresponde ao hash e false caso não correspondam
     */
    async verifyHash(hash, string) {
        const valid = await argon2.verify(hash, string);
        return valid;
    }
}

module.exports = new userServices();
