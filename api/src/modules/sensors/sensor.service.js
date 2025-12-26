const sensorRepository = require("./sensor.repository");
const sensorCache = require("./sensor.cache");

class SensorService {
    async storeSensorReading(body, req) {
        const { sensor_id, temperature, humidity, pressure, air_quality } =
            body;

        const sensorReading = {
            sensor_id,
            temperature,
            humidity,
            pressure,
            air_quality,
            created_at: new Date(),
        };

        // Validação mínima (pode evoluir depois)
        if (!sensor_id === undefined) {
            throw new Error("Dados do sensor inválidos");
        }

        // 1. Grava no PostgreSQL
        const saved = await sensorRepository.create(sensorReading);

        // 2. Atualiza Redis (estado atual)
        await sensorCache.setLastReading(sensor_id, {
            ...sensorReading,
        });

        // 3. Emite evento WebSocket para salas corretas
        req.io.to(`sensor:${sensor_id}`).emit("sensor:update", sensorReading);

        return saved;
    }

    async getHistoryReading(sensor_id, queries) {
        const { from = new Date(0), to = new Date(), interval = 5 } = queries;

        const startDate = from ? new Date(from) : new Date(0);
        const endDate = to ? new Date(to) : new Date();

        return {
            meta: {
                startDate,
                endDate,
                interval: `${interval} minutos`,
            },
            data: await sensorRepository.selectHistory(
                sensor_id,
                startDate,
                endDate,
                interval
            ),
        };
    }

    async getMetricsReading(sensor_id, queries) {
        const { from = new Date(0), to = new Date() } = queries;

        const resolution = this.getResolution(from, to);
        let dateTrunc;
        switch (resolution) {
            case "minute":
                dateTrunc = "minute";
                break;
            case "5minute":
                dateTrunc = "minute";
                break;
            case "hour":
                dateTrunc = "hour";
                break;
            case "day":
                dateTrunc = "day";
                break;
        }

        return {
            meta: {
                from,
                to,
                dateTrunc: `À cada ${dateTrunc}`,
            },
            data: await sensorRepository.selectMetrics(
                sensor_id,
                dateTrunc,
                resolution,
                from,
                to
            ),
        };
    }

    getResolution(from, to) {
        const diffMs = new Date(to) - new Date(from);
        const diffHours = diffMs / (1000 * 60 * 60);

        if (diffHours <= 1) return "minute";
        if (diffHours <= 24) return "5minute";
        if (diffHours <= 168) return "hour"; // 7 dias
        return "day";
    }
}

module.exports = new SensorService();
