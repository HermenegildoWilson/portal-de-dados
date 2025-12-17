const { createClient } = require("redis");
const env = require("./env");

const redisClient = createClient({ url: env.redis_url });

redisClient.on("connect", () => {
    console.log("Redis conectado");
});

redisClient.on("error", () => {
    console.error("Erro Redis:", err);
});

redisClient.connect().catch((err) => {
    console.error("Erro ao conectar no Redis:", err);
});

module.exports = { redisClient };
