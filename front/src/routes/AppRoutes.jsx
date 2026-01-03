import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Historico from "../pages/Historico";
import Dashboard from "../pages/Dashboard";
import Usuarios from "../pages/Usuarios";
import Notificacoes from "../pages/Notificacoes";
import Perfil from "../pages/Perfil";
import Cadastrar from "../pages/Cadastrar.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route element={<ProtectedRoute />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/historico" element={<Historico />} />
                    <Route path="/usuarios" element={<Usuarios />} />
                    <Route path="/notificacoes" element={<Notificacoes />} />
                    <Route path="/perfil" element={<Perfil />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="*" element={<NotFound />} />
                </Route>

                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastrar" element={<Cadastrar />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}
