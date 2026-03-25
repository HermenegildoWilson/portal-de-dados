import { api } from "@/config/api";
import type { SignInDto } from "./types";

const signIn = async (data: SignInDto) => {
  try {
    const response = await api.post("/auth/signin", data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      ...(error.response?.data || error),
    };
  }
};

const signOut = async () => {
  try {
    const response = await api.post("/auth/signout");

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      ...(error.response?.data || error),
    };
  }
};

const refresh = async () => {
  try {
    const response = await api.post("/auth/refresh");

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      ...(error.response?.data || error),
    };
  }
};

export const authService = {
  signIn,
  signOut,
  refresh,
};
