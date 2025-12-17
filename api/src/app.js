const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { router } = require("./index.routes");
const { conectDB } = require("./config/postgresqlClient");
//import { errorMiddleware } from "./shared/middlewares/error.middleware.js";

function createApp() {
    const app = express();

    app.use(
        cors({
            origin: process.env.APP_URL,
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
        })
    );

    app.use(cookieParser());

    app.use(express.json());

    app.use(router);

    //  app.use(errorMiddleware);

    /**
     * @description INICIALIZAÇÃO DA CONEXÃO COM O BANCO
     */
    conectDB();

    return app;
}

module.exports = { createApp };
