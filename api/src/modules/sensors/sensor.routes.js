/**
 * @description MIDLEWARE DE AUTENTICAÇÃODE ROTAS, PARA ASSEGURAR O ACESSO A ROTAS PROTEGIDAS, E CONTROLE DE PREVILÉGIOS
 */
const AuthMiddleware = require("../../shared/middlewares/auth.middleware");

/**
 * @description OBJECTO DE CONTROLLERS
 */
const sensorControllers = require("./sensor.controller");

/**
 * @description OBJECTO DE ROTEAMENTO
 */
const sensorsRouter = require("express").Router();

sensorsRouter.post("/data", sensorControllers.createSensorData);

sensorsRouter.get(
    "/:sensorId/last",
    AuthMiddleware.authanticateAccess,
    sensorControllers.getLastSensorData
);

module.exports = { sensorsRouter };
