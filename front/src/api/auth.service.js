import { api } from "./axios";

export const authService = {
    login: (data) => api.post("/login", data),
    logout: (user) => api.post("/logout", { user }),
    refresh: () => api.post("/auth/session"),
};
