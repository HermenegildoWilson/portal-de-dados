//Header.jsx
import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box, Tooltip } from "@mui/material";
import {
    Menu as MenuIcon,
    Notifications as NotificationsIcon,
    AccountCircle,
    ArrowLeftSharp,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import MyLinkButton from "../form/MyLinkButton";

export default function Header({ open, toggleDrawer, isMobile }) {
    const { user } = useAuth();
    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            /*sx={(theme) => ({
                zIndex: theme.zIndex.drawer + 1,
                transition: theme.transitions.create(["width", "margin"], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.standard,
                }),
                ...(!isMobile &&
                    open && {
                        marginLeft: 240,
                        width: `calc(100% - 240px)`,
                    }),
            })}*/
        >
            <Toolbar>
                {/* Ícone de abrir Drawer */}
                {true && (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        edge="start"
                        sx={{ mr: 2 }}
                    >
                        {open ? (
                            <Tooltip
                                title={"Fechar Menu"}
                                placement="right"
                            >
                                <ArrowLeftSharp />
                            </Tooltip>
                        ) : (
                            <Tooltip
                                title={"Abrir Menu"}
                                placement="right"
                            >
                                <MenuIcon />
                            </Tooltip>
                        )}
                    </IconButton>
                )}

                <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                    Estação de Dados
                </Typography>

                <Box sx={{ display: "flex" }}>
                    {user ? (
                        <>
                            <Link to={"/notificacoes"}>
                                <IconButton color="inherit">
                                    <NotificationsIcon />
                                </IconButton>
                            </Link>
                            <Link to={"/perfil"}>
                                <IconButton color="inherit">
                                    <AccountCircle />
                                </IconButton>
                            </Link>
                        </>
                    ) : (
                        <>
                            <MyLinkButton
                                to={"/login"}
                                sx={{ backgroundColor: "white" }}
                            >
                                Entrar
                            </MyLinkButton>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
