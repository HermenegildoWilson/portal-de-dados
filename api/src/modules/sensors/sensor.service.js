const sensorRepository = require("./sensor.repository");
const sensorCache = require("./sensor.cache");
const { emitSensorUpdate } = require("../../realtime/socket");

class SensorService {
    async storeSensorData(data) {
        const { sensor_id, temperature, humidity, pressure, altitude } = data;

        // Validação mínima (pode evoluir depois)
        if (!sensor_id || temperature === undefined) {
            throw new Error("Dados do sensor inválidos");
        }

        // 1. Grava no PostgreSQL
        const saved = await sensorRepository.create({
            sensor_id,
            temperature,
            humidity,
            pressure,
            altitude,
        });

        // 2. Atualiza Redis (estado atual)
        await sensorCache.setLastReading(sensor_id, {
            temperature,
            humidity,
            pressure,
            altitude,
            timestamp: saved.created_at,
        });

        // 3. Emite evento WebSocket
        emitSensorUpdate(sensor_id, currentState);
        
        return saved;
    }
}

module.exports = new SensorService();
