const AuthMiddleware = require("./shared/middlewares/auth.middleware");

const router = require("express").Router();

const { authRouter } = require("./modules/auth/auth.routes");
router.use("/auth", authRouter);

/**
 * @description INTEGRAÇÃO DO ROUTER DE USUÁRIO
 */
const { userRouter } = require("./modules/user/user.routes");
router.use("/", userRouter);

const { sensorsRouter } = require("./modules/sensors/sensor.routes");
router.use("/api/sensors", sensorsRouter);

module.exports = { router };
