const { Server } = require("socket.io");
const env = require("../config/env");
const { getLastReading } = require("../modules/sensors/sensor.cache.js");

let io;

class SocketIO {
    initSocket(server) {
        io = new Server(server, {
            cors: {
                origin: env.app_url,
                methods: ["GET", "POST"],
            },
        });

        io.on("connection", (socket) => {
            console.log("Socket conectado:", socket.id);

            setTimeout(() => {
                console.log("Socket ainda vivo?", socket.connected);
            }, 2000);

            socket.on("subscribe", async ({ sensors = [] }) => {
                console.log("📡 Subscribe recebido: ");

                // Salas por sensor
                sensors.forEach((sensor_id) => {
                    socket.join(`sensor:${sensor_id}`);
                });

                console.log("🟦 Salas atuais:", [...socket.rooms]);

                // Estado inicial apenas dos sensores pedidos
                const sensorStates = {};

                for (const sensor_id of sensors) {
                    const last = await getLastReading(sensor_id);
                    if (last) sensorStates[sensor_id] = last;
                }

                socket.emit("sensor:initial", {
                    sensors: sensorStates,
                });
            });

            socket.on("disconnect", () => {
                console.log("Socket desconectado:", socket.id);
            });
        });

        return io;
    }
}

module.exports = new SocketIO();
