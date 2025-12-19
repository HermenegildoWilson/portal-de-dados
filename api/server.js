const http = require("http");

const env = require("./src/config/env");
const { createApp } = require("./src/app");
const { initSocket } = require("./src/realtime/socket");
const { router } = require("./src/index.routes");
const { errorMiddleware } = require("./src/shared/middlewares/error.middleware");

const app = createApp();

// Inicializar socket
const server = http.createServer(app);
const io = initSocket(server);

// Middleware para expor io aos controllers
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(router);
app.use(errorMiddleware);

server.listen(env.port, () => {
    console.log(`Servidor a rodar na porta ${env.port}`);
});
