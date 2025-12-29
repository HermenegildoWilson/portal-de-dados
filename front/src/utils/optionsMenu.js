import { iconMapper } from "./iconMapper";
export const menuItems = {
    admin: [
        { text: "Dashboard", path: "/", icon: iconMapper.dashboard },
        { text: "Histórico", path: "/historico", icon: iconMapper.chart,},
        { text: "Usuários", path: "/usuarios", icon: iconMapper.people },
        //{ text: "Configurações", path: "/configuracoes", icon: iconMapper.configuracoes, },
        { text: "Notificações", path: "/notificacoes", icon: iconMapper.bell },
        { text: "Perfil", path: "/perfil", icon: iconMapper.perfil, },
        { text: "Sair", path: "/logout", icon: iconMapper.logout, },
    ],
    visitor: [
        { text: "Dashboard", path: "/", icon: iconMapper.dashboard },
        { text: "Histórico", path: "/historico", icon: iconMapper.chart, },
        { text: "Notificações", path: "/notificacoes", icon: iconMapper.bell },
        { text: "Perfil", path: "/perfil", icon: iconMapper.perfil, },
        { text: "Sair", path: "/logout", icon: iconMapper.logout, },
    ],
    public: [
        {
            text: "Início",
            path: "/home",
            descricao: "Landing page / visão geral.",
            icon: iconMapper.home,
        },
        {
            text: "Entrar",
            path: "/login",
            descricao: "Acesso ao portal atraves de uma conta.",
            icon: iconMapper.login,
        },
        {
            text: "Criar conta",
            path: "/cadastrar",
            descricao: "Acesso ao portal atraves de uma conta.",
            icon: iconMapper.cadastrar,
        },
    ],
};
