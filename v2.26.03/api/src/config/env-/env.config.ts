import { getLocalIp } from '@/common/utils/getLocalIp';

export default () => {
  const isDev = process.env.NODE_ENV === 'development';
  const localIp = isDev ? getLocalIp() : null;

  const apiPort = parseInt(process.env.API_PORT!);
  const apiHost = process.env.API_HOST;

  const appPort = parseInt(process.env.APP_PORT!);
  const appHost = process.env.APP_HOST;

  return {
    api: {
      env: process.env.NODE_ENV,
      logLevel: process.env.LOG_LEVEL,
      port: apiPort,
      host: apiHost,
      url: isDev
        ? `http://${localIp}:${apiPort}`
        : `https://${apiHost}:${apiPort}`,
      isDev: isDev,
    },

    app: {
      url: isDev
        ? `http://${localIp}:${appPort}`
        : `https://${appHost}:${appPort}`,
      deepLinking: isDev
        ? `exp://${localIp}:${appPort}`
        : `campusone://${appHost}:${appPort}`,

      // process.env.APP_DEEP_LINKING,
    },

    database: {
      url: process.env.DATABASE_URL,
    },

    mail: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },

    jwt: {
      accessSecret: process.env.JWT_ACCESS_SECRET,
      refreshSecret: process.env.JWT_REFRESH_SECRET,
      accessExpiresIn: process.env.JWT_ACCESS_IN,
      refreshExpiresIn: process.env.JWT_REFRESH_IN,
    },

    swagger: {
      enabled: process.env.SWAGGER_ENABLED === 'true',
      path: process.env.SWAGGER_PATH ?? 'docs',
    },

    throttler: {
      ttl: parseInt(process.env.RATE_LIMIT_TTL ?? '60', 10),
      limit: parseInt(process.env.RATE_LIMIT_LIMIT ?? '100', 10),
      authTtl: parseInt(process.env.AUTH_RATE_LIMIT_TTL ?? '60', 10),
      authLimit: parseInt(process.env.AUTH_RATE_LIMIT_LIMIT ?? '5', 10),
      blockDuration:
        parseInt(process.env.RATE_LIMIT_BLOCK_DURATION ?? '180', 10) * 1000,
    },
  };
};
