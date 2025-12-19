import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

import Main from "../pages/Main";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Perfil from "../pages/Perfil";
import Historico from "../pages/Historico";
import Usuarios from "../pages/Usuarios";
import Notificacoes from "../pages/Notificacoes";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <AppLayout>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Main />} />

                        <Route path="/historico" element={<Historico />} />

                        <Route
                            path="/notificacoes"
                            element={<Notificacoes />}
                        />

                        <Route path="/usuarios" element={<Usuarios />} />

                        <Route path="/perfil" element={<Perfil />} />

                        <Route path="/logout" element={<Logout />} />
                    </Route>

                    <Route path="/home" element={<Home />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
            </AppLayout>
        </BrowserRouter>
    );
}
