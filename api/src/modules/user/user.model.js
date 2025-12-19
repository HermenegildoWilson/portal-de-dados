const models = require("../../config/postgresqlClient").conectModels();

const model = {
    async create(data) {
        const res = await models.usuario.create(data);
        return res;
    },

    async select(condition) {
        const usuarios_encontrados = await models.usuario.findAll({
            where: condition,
            raw: true,
        });

        return usuarios_encontrados;
    },
    async selectOne(condition) {
        const usuarios_encontrados = await models.usuario.findOne({
            where: condition,
            raw: true,
        });

        return usuarios_encontrados;
    },
    update(data) {
        return "update";
    },
    delete(id) {
        return "delete";
    },
};

module.exports = model;
