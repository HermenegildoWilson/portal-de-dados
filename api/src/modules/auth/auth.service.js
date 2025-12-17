const jwt = require("jsonwebtoken");

class authServices {
    /**
     * @param {JSON} payload - Dados que serão guardados no token
     * @param {String} TOKEN_SECRET - Chave secreta de criação do token
     * @param {String} TOKEN_EXPIRATION - Tempo de validade do token
     * @param {String} type - Tipo de token a gerar {ACCESS, REFRESH}
     * @returns {String} Token gerado
     */
    async createToken(payload, TOKEN_SECRET, TOKEN_EXPIRATION) {
        const token = jwt.sign({ payload }, TOKEN_SECRET, {
            expiresIn: TOKEN_EXPIRATION,
        });
        return token;
    }
}

module.exports = new authServices();
