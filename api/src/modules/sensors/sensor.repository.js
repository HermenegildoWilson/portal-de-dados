import { Op, fn, col, literal, QueryTypes } from "sequelize";
import { getModels } from "../../config/postgresqlClient.js";
const { sensor_readings: sensor_readings_model } = getModels();

const SensorRepository = {
    async create(data) {
        try {
            const result = await sensor_readings_model.create(data);
            return result;
        } catch (error) {
            console.error("ERRO DETALHADO DO POSTGRES:", error.parent); // Isso mostrará o erro real do SQL
            console.error("ERRO DE VALIDAÇÃO:", error.errors); // Caso seja erro do Sequelize
            throw error;
        }
    },

    async select(condition) {
        const dados_encontrados = await sensor_readings_model.findAll({
            where: condition,
            raw: true,
        });

        return dados_encontrados;
    },

    async selectHistory(sensor_id, startDate, endDate, minuteInterval = 5) {
        try {
            const intervalSeconds = minuteInterval * 60; // 5 minutos

            const rows = await sensor_readings_model.findAll({
                attributes: [
                    [
                        literal(
                            `to_timestamp(floor(extract('epoch' from "created_at")/${intervalSeconds})*${intervalSeconds})`
                        ),
                        "timestamp",
                    ],
                    [
                        literal(`ROUND(AVG("temperature")::numeric, 2)`),
                        "Temperatura",
                    ],
                    [literal(`ROUND(AVG("humidity")::numeric, 2)`), "Humidade"],
                    [
                        literal(`ROUND(AVG("air_quality")::numeric, 2)`),
                        "Qualidade do Ar",
                    ],
                    [
                        literal(`ROUND(AVG("pressure")::numeric, 2)`),
                        "Pressão do Ar",
                    ],
                ],
                where: {
                    sensor_id,
                    created_at: { [Op.between]: [startDate, endDate] },
                },
                group: [
                    literal(
                        `to_timestamp(floor(extract('epoch' from "created_at")/${intervalSeconds})*${intervalSeconds})`
                    ),
                ],
                order: [
                    [
                        literal(
                            `to_timestamp(floor(extract('epoch' from "created_at")/${intervalSeconds})*${intervalSeconds})`
                        ),
                        "ASC",
                    ],
                ],
            });

            return rows;
        } catch (error) {
            console.error("ERRO DETALHADO DO POSTGRES:", error.parent); // Isso mostrará o erro real do SQL
            console.error("ERRO DE VALIDAÇÃO:", error.errors); // Caso seja erro do Sequelize
            throw error;
        }
    },

    async selectMetrics(sensor_id, dateTrunc, resolution, from, to) {
        try {
            const query = `
    SELECT
      ${
          resolution === "5minute"
              ? "DATE_TRUNC('minute', created_at) - INTERVAL '1 minute' * (EXTRACT(MINUTE FROM created_at)::int % 5)"
              : `DATE_TRUNC('${dateTrunc}', created_at)`
      } AS period,
        ROUND(AVG("temperature")::numeric, 2) AS "Temperatura",
        ROUND(AVG("humidity")::numeric, 2) AS "Humidade",
        ROUND(AVG("air_quality")::numeric, 2) AS "Qualidade do Ar",
        ROUND(AVG("pressure")::numeric, 2) AS "Pressao do Ar"sensor_readings_model
    WHERE sensor_id = 'esp32_01'
    AND created_at BETWEEN '2025-12-01' AND '2025-12-19'
    GROUP BY period
    ORDER BY period;`;

            const data = await sequelize.query(query, {
                replacements: { sensor_id, from, to },
                type: QueryTypes.SELECT,
            });

            return {
                points: data.length,
                data,
            };
        } catch (error) {
            console.error("ERRO DETALHADO DO POSTGRES:", error.parent); // Isso mostrará o erro real do SQL
            console.error("ERRO DE VALIDAÇÃO:", error.errors); // Caso seja erro do Sequelize
            throw error;
        }
    },
};

export default SensorRepository;
