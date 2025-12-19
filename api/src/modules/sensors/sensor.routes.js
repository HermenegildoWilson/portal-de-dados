const AuthMiddleware = require("../../shared/middlewares/auth.middleware");

const sensorControllers = require("./sensor.controller");

const sensorsRouter = require("express").Router();

sensorsRouter.post("/data", sensorControllers.receiveSensorReading);

sensorsRouter.get(
    "/:sensorId/last",
    AuthMiddleware.authanticateAccess,
    sensorControllers.getLastSensorReading
);

sensorsRouter.get(
    "/:sensorId/history", //?from=2025-12-01&to=2025-12-18&interval=5
    //AuthMiddleware.authanticateAccess,
    sensorControllers.getHistorySensorReading
);

sensorsRouter.get(
    "/:sensorId/metrics", //?from=2025-12-01&to=2025-12-18&interval=5
    //AuthMiddleware.authanticateAccess,
    sensorControllers.getMetricsSensorReading
);

module.exports = { sensorsRouter };
