import redisClient from "../../config/redis.js";

class classSensorCache {
    async setLastReading(sensor_id, data) {
        const key = `sensor:${sensor_id}:last`;
        await redisClient.set(key, JSON.stringify(data));
    }

    async getLastReading(sensor_id) {
        const key = `sensor:${sensor_id}:last`;

        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    }
}

const SensorCache = new classSensorCache();

export default SensorCache;
