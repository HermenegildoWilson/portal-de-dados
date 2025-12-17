const { Server } = require("socket.io");

let io;

class SocketIO {
    initSocket(server) {
        io = new Server(server, {
            cors: {
                origin: "*",
            },
        });

        io.on("connection", (socket) => {
            console.log("Cliente conectado:", socket.id);

            socket.on("disconnect", () => {
                console.log("Cliente desconectado:", socket.id);
            });
        });
    }

    emitSensorUpdate(sensorId, data) {
        if (!io) return;

        io.emit("sensor:update", {
            sensorId,
            data,
        });
    }
}

module.exports = new SocketIO();
