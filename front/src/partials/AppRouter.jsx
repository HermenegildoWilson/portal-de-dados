import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

import Main from "../pages/Main";
import Home from "../pages/Home";
import { useAuthProvider } from "../context/AuthProvider";
import Login from "../pages/Login";
import MyLoader from "../components/MyLoader";
import Logout from "../pages/Logout";
import Perfil from "../pages/Perfil";
import Historico from "../pages/Historico";
import Usuarios from "../pages/Usuarios";
import Notificacoes from "../pages/Notificacoes";

export default function AppRouter() {
    const { appState } = useAuthProvider();

    return (
        <BrowserRouter>
            {appState === "loading" && <MyLoader sx={"text-blue-500 text-4xl"} />}
            <AppLayout>
                <Routes> 
                    <Route path="/" element={<Main />} />

                    <Route path="/historico" element={<Historico />} />

                    <Route path="/notificacoes" element={<Notificacoes />} />

                    <Route path="/usuarios" element={<Usuarios />} />

                    <Route path="/perfil" element={<Perfil />} />

                    <Route path="/home" element={<Home />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/logout" element={<Logout />} />

                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
            </AppLayout>
        </BrowserRouter>
    );
}
