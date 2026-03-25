import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  // Api Configuration
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  LOG_LEVEL: Joi.string().required(),

  API_PORT: Joi.number().required(),
  API_HOST: Joi.string().required(),

  // Database (if needed in future)
  DATABASE_URL: Joi.string().optional(),

  // CORS | App Configuration
  APP_HOST: Joi.string().required(),
  APP_PORT: Joi.string().required(),
  APP_DEEP_LINKING: Joi.string().required(),

  // Security
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_ACCESS_IN: Joi.string().required(),
  JWT_REFRESH_IN: Joi.string().required(),

  // Mais Service
  MAIL_USER: Joi.string().email().required(),
  MAIL_PASS: Joi.string().required(),

  SWAGGER_ENABLED: Joi.string().valid('true', 'false').required(),
  SWAGGER_PATH: Joi.string().required(),

  RATE_LIMIT_TTL: Joi.number().integer().min(1).required(),
  RATE_LIMIT_LIMIT: Joi.number().integer().min(1).required(),
  AUTH_RATE_LIMIT_TTL: Joi.number().integer().min(1).required(),
  AUTH_RATE_LIMIT_LIMIT: Joi.number().integer().min(1).required(),
  RATE_LIMIT_BLOCK_DURATION: Joi.number().integer().min(1).required(),
});
