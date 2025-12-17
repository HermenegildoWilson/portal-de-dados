/**
 * @description MODEL DE ITERAÇÃO COM O DB DE SERVIÇOS
 */

const { dados_model } = require("../../models");
const sensorCache = require("./sensor.cache");
const sensorService = require("./sensor.service");
class userControllers {
    createSensorData = async (req, res, next) => {
        try {
            const data = req.body;

            const result = await sensorService.storeSensorData(data);

            return res.status(201).json({
                success: true,
                data: result,
            });
        } catch (error) {
            next(error);
        }
    };

    getLastSensorData = async (req, res, next) => {
        try {
            const { sensorId } = req.params;

            const data = await sensorCache.getLastReading(sensorId);

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: "Sem dados para este sensor",
                });
            }

            return res.status(200).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new userControllers();
