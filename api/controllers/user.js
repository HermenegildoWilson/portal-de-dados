/**
 * @description OBJECTO DE SERVIÇOS
 */
const jwt = require("jsonwebtoken");
const { userServices } = require("../services");
const { createToken } = require("../services/auth");
const REGISTER_TOKEN_SECRET = process.env.REGISTER_TOKEN_SECRET;
const REGISTER_TOKEN_EXPIRATION = process.env.REGISTER_TOKEN_EXPIRATION;

class userControllers {
    /**
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }}
     */
    cadastrar = async (req, res) => {
        try {
            const usuario = req.body;
            const { registerKey } = req.params;
            let userRole = null;

            // SETIVER UM TOKEN DE ACESSO, VERIFICAMO-LO COM A CHAVE.
            jwt.verify(
                registerKey,
                process.env.REGISTER_TOKEN_SECRET,
                (err, data) => {
                    // SE O TOKEN DE ACESSO ESTIVER EM DIA, ENTÃO OK.
                    if (!err) {
                        userRole = data?.payload.role;
                    }
                }
            );

            if (!userRole) {
                return res.status(403).json({
                    status: 403,
                    success: false,
                    message: "Sem autorização para fazer cadastro!",
                });
            }

            const response = await userServices.cadastrar({
                ...usuario,
                role: userRole,
            });
            // Em caso de insucesso
            if (!response.success) {
                // Se tiver informações de erro é porque o erro é interno: 500
                if (response.errors) {
                    console.log(
                        `\n\n${response.message}... ${response.errors}.\n`
                    );
                    return res.status(500).json({
                        status: 500,
                        ...response,
                    });
                }

                // Se não tiver é porque o erro é do lado do cliente {Conflito de dados ou Chave enviada inexistente}
                return res.status(response.status).json({
                    ...response,
                });
            }

            // Se chegamos até aqui é porque tudo tá OK
            return res.status(200).json({
                status: 200,
                ...response,
            });
        } catch (error) {
            // Em caso de um outro erro inesperado tratamos aqui.
            console.log(`\n\nErro interno ao efeituar cadastro... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao efeituar cadastro",
                errors: `${error}`,
            });
        }
    };

    /**
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }}
     */
    login = async (req, res) => {
        try {
            const credencials = req.body;

            const response = await userServices.login(credencials, res);
            // Em caso de insucesso
            if (!response.success) {
                // Se tiver informações de erro é porque o erro é interno: 500
                if (response.errors) {
                    console.log(
                        `\n\n${response.message}... ${response.errors}.\n`
                    );
                    return res.status(500).json({
                        status: 500,
                        ...response,
                    });
                }

                // Se não tiver é porque o erro é do lado do cliente {Conflito de dados ou Chave enviada inexistente}
                return res.status(response.status).json({
                    ...response,
                });
            }

            // Se chegamos até aqui é porque tudo tá OK
            return res.status(200).json({
                status: 200,
                ...response,
            });
        } catch (error) {
            // Em caso de um outro erro inesperado tratamos aqui.
            console.log(`\n\nErro interno ao efeituar login... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao efeituar login",
                errors: `${error}`,
            });
        }
    };

    /**
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }}
     */
    generateKeyRegister = async (req, res) => {
        try {
            const { role } = req.body;

            const payload = { role: role };
            const REGISTER_TOKEN = await createToken(
                payload,
                REGISTER_TOKEN_SECRET,
                REGISTER_TOKEN_EXPIRATION
            );

            // Se chegamos até aqui é porque tudo tá OK
            return res.status(200).json({
                status: 200,
                registerKey: REGISTER_TOKEN
            });
        } catch (error) {
            // Em caso de um outro erro inesperado tratamos aqui.
            console.log(`\n\nErro interno ao efeituar login... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao efeituar login",
                errors: `${error}`,
            });
        }
    };

    /**
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }}
     */
    logout = async (req, res) => {
        try {
            const response = await userServices.logout(req, res);

            // Em caso de insucesso
            if (!response.success) {
                // Se tiver informações de erro é porque o erro é interno: 500
                console.log(`\n\n${response.message}... ${response.errors}.\n`);
                return res.status(500).json({
                    status: 500,
                    ...response,
                });
            }

            // Se chegamos até aqui é porque tudo tá OK
            return res.status(200).json({
                status: 200,
                ...response,
            });
        } catch (error) {
            // Em caso de um outro erro inesperado tratamos aqui.
            console.log(`\n\nErro interno ao efeituar logout... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao efeituar logout",
                errors: `${error}`,
            });
        }
    };
}

module.exports = new userControllers();
