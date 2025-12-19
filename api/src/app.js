const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { conectDB } = require("./config/postgresqlClient");
const env = require("../src/config/env");

function createApp() {
    const app = express();

    app.use(helmet());

    app.use(
        cors({
            origin: env.app_url,
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
        })
    );

    app.use(cookieParser());

    app.use(express.json());

    /**
     * @description INICIALIZAÇÃO DA CONEXÃO COM O BANCO
     */
    conectDB();

    return app;
}

module.exports = { createApp };
