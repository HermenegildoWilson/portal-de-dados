const models = require("../../config/postgresqlClient").conectModels();

const repository = {
    async create(data) {
        try {
            const result = await models.sensor_readings.create(data);
            return result;
        } catch (error) {
            console.error("ERRO DETALHADO DO POSTGRES:", error.parent); // Isso mostrará o erro real do SQL
            console.error("ERRO DE VALIDAÇÃO:", error.errors); // Caso seja erro do Sequelize
            throw error;
        }
    },

    async select(condition) {
        const dados_encontrados = await models.sensor_readings.findAll({
            where: condition,
            raw: true,
        });

        return dados_encontrados;
    },
    async selectOne(condition) {
        const dados_encontrados = await models.sensor_readings.findOne({
            where: condition,
            raw: true,
        });

        return dados_encontrados;
    },
    async selectLast() {
        const usuarios_encontrados = await models.sensor_readings.findOne({
            order: [["criado_em", "DESC"]],
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

module.exports = repository;
