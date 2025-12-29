import AuthMiddleware from "../../shared/middlewares/auth.middleware.js";
import SensorControllers from "./sensor.controller.js";

import { Router } from "express";
const sensorsRouter = Router()
sensorsRouter.post("/data", SensorControllers.receiveSensorReading);

sensorsRouter.get(
    "/:sensorId/last",
    AuthMiddleware.authanticateAccess,
    SensorControllers.getLastSensorReading
);

sensorsRouter.get(
    "/:sensorId/history", //?from=2025-12-01&to=2025-12-18&interval=5
    //AuthMiddleware.authanticateAccess,
    SensorControllers.getHistorySensorReading
);

sensorsRouter.get(
    "/:sensorId/metrics", //?from=2025-12-01&to=2025-12-18&interval=5
    //AuthMiddleware.authanticateAccess,
    SensorControllers.getMetricsSensorReading
);

export default sensorsRouter;
