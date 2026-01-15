import AuthMiddleware from "../../shared/middlewares/auth.middleware.js";
import SensorControllers from "./sensor.controller.js";

import { Router } from "express";
const sensorsRouter = Router();

sensorsRouter.post("/register/location", SensorControllers.registerLocation);

sensorsRouter.post("/register/sensor", SensorControllers.registerSensor);

sensorsRouter.post("/register/reading", SensorControllers.receiveSensorReading);

sensorsRouter.get(
    "/:sensorCode/last",
    AuthMiddleware.authanticateAccess,
    SensorControllers.getLastSensorReading
);

sensorsRouter.get(
    "/:sensorCode/history",
    AuthMiddleware.authanticateAccess,
    SensorControllers.getHistorySensorReading
);

sensorsRouter.get(
    "/:sensorCode/metrics",
    AuthMiddleware.authanticateAccess,
    SensorControllers.getMetricsSensorReading
);

export default sensorsRouter;
