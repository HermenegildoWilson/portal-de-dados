import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import MyLoader from "../components/MyLoader";
import { MyAlertContext } from "../App";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [appState, setAppState] = useState("loading"); // error || loading || done
    const { setOpenAlert } = useContext(MyAlertContext).state;

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });

    // Lógica para o login manual
    async function login(credencials, url = "/login") {
        try {
            const res = await api.post(url, credencials);
            setUser(res.data.user);
            setAccessToken(res.data.access_token);
            return res.data;
        } catch (error) {
            return error?.response?.data;
        }
    }

    // Lógica para o logout manual
    async function logout(url = "/logout") {
        try {
            const res = await api.post(url, { user: user });
            console.log(accessToken);
            
            setUser(null);
            setAccessToken(null);

            return res.data;
        } catch (error) {
            return error?.response.data;
        }
    }

    // Refresh token automático
    async function refresh() {
        try {
            const res = await api.post("/auth/session");
            setAccessToken(res.data.access_token);
            setUser(res.data.user);
            return res.data;
        } catch (err) {
            console.log(err.response?.data.message || err.message);
            //logout();
        }
    }

    // Restauração de sessão automático, logo que a app carregar chamamos esta função
    async function restoreSession() {
        try {
            const res = await api.post("/auth/session");
            
            setUser(res.data.user);
            setAccessToken(res.data.access_token);

            return res;
        } catch (err) {
            return err?.response?.data;
        } finally {
            setAppState("done");
        }
    }



    // Interceptamos todas as requisições para garantir o envio do access_token
    useEffect(() => {
        const interceptor = api.interceptors.request.use(
            async (config) => {
                if (!accessToken) return config;

                config.headers.Authorization = `Bearer ${accessToken}`;
                return config;
            }
        );

        return () => api.interceptors.request.eject(interceptor);
    }, [accessToken]);

    // Interceptamos todas as respostas, para o caso de receber um status 401 e fazer o refresh do access_token automáticamente.
    useEffect(() => {
        const interceptor = api.interceptors.response.use(
            (res) => res,
            async (err) => {
                if (err.response?.status === 401) {
                    const res = await refresh();

                    if (res.access_token) {
                        err.config.headers.Authorization = `Bearer ${res.access_token}`;
                        return api(err.config);
                    }
                }
                return Promise.reject(err);
            }
        );

        return () => api.interceptors.response.eject(interceptor);
    }, [accessToken]);

    ///Interceptamos todas as respostas, para o caso de receber um status 403 e redirecionar para a tela de login.
    useEffect(() => {        
        const interceptor = api.interceptors.response.use(
            (res) => res,
            async (err) => {
                if (err.response?.status === 403) {
                    setOpenAlert({ type: "SHOW", text: err.response?.data?.message, style: "warning" });
                }
                return Promise.reject(err);
            }
        );
        return () => api.interceptors.response.eject(interceptor);
    }, []);

    // Restauramos a sessão ao carregar app
    useEffect(() => {
        restoreSession();
    }, []);

    if (appState === "loading") {
        return (
            <>
                <div className="flex flex-col justify-center items-center h-screen border">
                    <p className="text-xl mb-4">Carregando...</p>
                    <MyLoader sx={"text-blue-500"} />
                </div>
            </>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                user: user,
                api: api,
                login: login,
                logout: logout,
                appState: appState,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthProvider() {
    return useContext(AuthContext);
}
