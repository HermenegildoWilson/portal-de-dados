export const optionsMenu = {
    public: [
        {
            titulo: "Início",
            link: "/",
            descricao:
                "Landing page / visão geral.",
            icone: "home",
        },
        {
            titulo: "Entrar",
            link: "/login",
            descricao:
                "Acesso ao portal atraves de uma conta.",
            icone: "login",
        }
    ],
    user: [
        {
            titulo: "Dados em Tempo Real",
            link: "/",
            descricao:
                "Visualização atual dos sensores.",
            icone: "speed",
        },
        {
            titulo: "Gráficos",
            link: "/historico",
            descricao:
                "Análise visual (temperatura, humidade, etc.",
            icone: "chart",
        },
        {
            titulo: "Notificações",
            link: "/diretor/notificacoes",
            descricao:
                "Envio de avisos e notas informativas para toda a comunidade escolar.",
            icone: "bell",
        },
    ],
    admin: [
        {
            titulo: "Dados em Tempo Real",
            link: "/",
            descricao:
                "Visualização atual dos sensores.",
            icone: "speed",
        },
        {
            titulo: "Gráficos",
            link: "/historico",
            descricao:
                "Análise visual (temperatura, humidade, etc.",
            icone: "chart",
        },
        {
            titulo: "Gestão de Usuarios",
            link: "/diretor/professores",
            descricao:
                "Registo, gestão e atribuição de disciplinas aos docentes.",
            icone: "people",
        },
        {
            titulo: "Notificações",
            link: "/diretor/notificacoes",
            descricao:
                "Envio de avisos e notas informativas para toda a comunidade escolar.",
            icone: "bell",
        },
    ],
    profile: [
        {
            titulo: "Meu Perfil",
            link: "/perfil",
            descricao:
                "Visualização do perfil de usuario.",
            icone: "perfil",
        },
        {
            titulo: "Sair",
            link: "/logout",
            descricao:
                "Sair da plataforma.",
            icone: "logout",
        }
    ],
};
