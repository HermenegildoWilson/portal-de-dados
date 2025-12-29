import SensorCache from "./sensor.cache.js";
import SensorService from "./sensor.service.js";

class classSensorControllers {
    receiveSensorReading = async (req, res, next) => {
        try {
            const data = req.body;
            console.log(`Dados do sensor:${data.sensor_id} recebidos...`);

            const result = await SensorService.storeSensorReading(data, req);

            return res.status(201).json({
                success: true,
                data: result,
            });
        } catch (error) {
            next(error);
        }
    };

    getLastSensorReading = async (req, res, next) => {
        try {
            const { sensorId } = req.params;

            const data = await SensorCache.getLastReading(sensorId);

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

    getHistorySensorReading = async (req, res, next) => {
        try {
            const { sensorId } = req.params;
            if (!sensorId)
                return res
                    .status(400)
                    .json({ error: "SensorId é obrigatório" });

            const data = await SensorService.getHistoryReading(
                sensorId,
                req.query
            );

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: "Sem dados para este sensor",
                });
            }

            return res
                .status(200)
                .json({ success: true, data: data.data, meta: data.meta });
        } catch (error) {
            next(error);
        }
    };

    getMetricsSensorReading = async (req, res, next) => {
        try {
            const { sensorId } = req.params;

            if (!sensorId)
                return res
                    .status(400)
                    .json({ error: "SensorId é obrigatório" });

            const data = await SensorService.getMetricsReading(
                sensorId,
                req.query
            );

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: "Sem dados para este sensor",
                });
            }

            return res
                .status(200)
                .json({ success: true, data: data.data.data, meta: data.meta });
        } catch (error) {
            next(error);
        }
    };
}

const SensorControllers = new classSensorControllers();

export default SensorControllers;
