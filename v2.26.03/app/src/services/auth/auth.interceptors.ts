import { Axios, AxiosRequestConfig } from "axios";
import { authService } from "./auth.service";

type RetriableRequestConfig = AxiosRequestConfig & { _retry?: boolean };

let refreshPromise: Promise<
  Awaited<ReturnType<typeof authService.refresh>>
> | null = null;

const refreshTokens = async () => {
  if (!refreshPromise) {
    refreshPromise = authService.refresh().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

// Interceptor para enviar token automaticamente
const accesTokenInteceptor = (api: Axios) => {
  api.interceptors.request.use(
    async (config) => {
      const token = await SecureStore.getItemAsync("access_token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );
};

// Interceptor para tratar erro global/401 / Refresco automático do token
const refreshTokenInteceptor = (api: Axios) => {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status;
      const originalConfig = error.config as RetriableRequestConfig | undefined;

      if (status === 401 && originalConfig && !originalConfig._retry) {
        const url = originalConfig.url ?? "";
        if (url.includes("/auth/refresh") || url.includes("/auth/signin")) {
          return Promise.reject(error);
        }

        originalConfig._retry = true;

        const result = await refreshTokens();
        if (result?.success) {
          return api(originalConfig);
        }
      }

      return Promise.reject(error);
    },
  );
};

// Interceptor para tratar erro global/401 / Refresco automático do token
const netWorkErrorInteceptor = (api: Axios) => {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.message === "Network Error" || error?.code === "ERR_NETWORK") {
        alertService.error("Please check your connection and try again.", {
          title: "Network error",
          durationMs: 3000,
        });
      }
      return Promise.reject(error);
    },
  );
};

export const Inteceptors = {
  accesTokenInteceptor,
  refreshTokenInteceptor,
  netWorkErrorInteceptor,
};
