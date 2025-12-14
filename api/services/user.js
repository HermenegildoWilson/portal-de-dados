const argon2 = require("argon2");
const { usuario_model, token_model } = require("../models");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION;
const { createToken } = require("./auth");
//
class userServices {
    /**
     * @param {Object} usuario - Objecto com os dados do novo usuario
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      user: JSON,
     *      errors: undefined
     * }} - Objecto contendo o novo usuario criado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
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

            const usuario_criado = await usuario_model.create({
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
     * @param {Object} credencials - Objecto com as credencias do usuario
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o novo usuario criado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
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
                ACCESS_TOKEN_SECRET,
                ACCESS_TOKEN_EXPIRATION
            );

            const REFRESH_TOKEN = await createToken(
                payload,
                REFRESH_TOKEN_SECRET,
                REFRESH_TOKEN_EXPIRATION
            );

            /**
             * @description NESTE TRECHO GURDAMOS O TOKE DE REFRESH NO BANCO DE DADOS
             */
            token_model.create({
                id_usuario: responseEmail.data.id,
                refresh_token: REFRESH_TOKEN,
            });

            /**
             * @description NESTE TRECHO GURDAMOS O TOKE DE REFRESH NUM COOKIE
             */
            const COOKIE_EXPIRATION = process.env.COOKIE_EXPIRATION;

            res.cookie("refresh_token", REFRESH_TOKEN, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: COOKIE_EXPIRATION,
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
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o novo candidato criado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async logout(req, res) {
        try {
            const { user } = req.body;
            const refresh_token = req.cookies.refresh_token;

            token_model.delete({
                refresh_token: refresh_token,
            });

            const COOKIE_EXPIRATION = process.env.COOKIE_EXPIRATION;
            res.clearCookie("refresh_token", {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: COOKIE_EXPIRATION,
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
     * @param {Object} param0
     * @param {*} param0.email
     * @param {*} param0.role
     * @returns {{
     *      success: Boolean,
     *      data: JSON
     * }} - Retorna true se já existe e false se ele não exite
     */
    async verifyUserEmail({ email, role }) {
        /**
         * @description NESTE TRECHO VERIFICAMOS SE O EMAIL DO usuario ESTÁ DISPONÍVEL
         */
        let usuario_encontrado = await usuario_model.selectOne({
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
