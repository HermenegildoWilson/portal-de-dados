const { createApp } = require("./src/app");
const env = require("./src/config/env");
const { initSocket } = require("./src/realtime/socket");
const http = require("http");

const app = createApp();

const server = http.createServer(app)
initSocket(server)

app.listen(env.port, () => {
    console.log(`Servidor a rodar na porta ${env.port}`);
});
