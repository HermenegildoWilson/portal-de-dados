const models = require("../config/postgresqlClient").conectModels();

const token_model = {
    async create(data) {
        const res = await models.tokens.create(data);
        return res;
    },

    async select(condition) {
        const token_encontrado = await models.tokens.findAll({
            where: condition,
            row: true,
        });

        return token_encontrado;
    },
    async selectOne(condition) {
        const token_encontrado = await models.tokens.findOne({
            where: condition,
            row: true,
        });

        return token_encontrado;
    },
    update(data) {
        return "update";
    },
    async delete(condition) {
        try {
            const token_deletado = await models.tokens.destroy({
                where: condition,
                row: true,
            });

            return token_deletado;
        } catch (error) {
            console.log(`\n\nErro interno ao efeituar logout... ${error}.\n`);

            return {
                success: false,
                message: "Erro ao fazer logout",
                errors: `${error}`,
            };
        }
    },
};

module.exports = { token_model };
