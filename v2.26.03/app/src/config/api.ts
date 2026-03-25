import axios from "axios";
import { env } from "./env";

export const api = axios.create({
  baseURL: env.apiUrl,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});
