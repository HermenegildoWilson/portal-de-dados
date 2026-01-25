import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { iconMapper } from "../utils/iconMapper.js";
import { useAuth } from "../hooks/useAuth";
import MiniMenu from "../components/modal/MiniMenu";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppLoader from "../components/feedback/AppLoader";
import { api } from "../api/axios";

export default function Perfil() {
    const { user } = useAuth();
    const { id } = useParams();
    const [userPerfil, setUserPerfil] = useState(null);
    const [pageState, setPageState] = useState("loading");
    async function getPeople() {
        try {
            const url = "/user/usuarios";

            const { data } = await api.get(url, {
                params: { id: id },
            });
            const people = data.data[0];

            if (people) {
                return setUserPerfil(people);
            } else {
                return setUserPerfil({});
            }
        } catch (error) {
            setUserPerfil([]);
        } finally {
            setPageState("done");
        }
    }

    useEffect(() => {
        if (id) {
            getPeople();
        } else {
            setUserPerfil(user);
            setPageState("done");
        }
    }, []);

    if (pageState === "loading") {
        return (
            <Box
                sx={{
                    height: "89.9vh",
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                }}
            >
                <Typography variant="body1" fontSize={"1.3rem"}>
                    Carregando...
                </Typography>
                <AppLoader />
            </Box>
        );
    }

    let perfilObject = { keys: [], values: [] };
    let formDelete;

    if (userPerfil?.nome) {
        perfilObject.keys = Object.keys(userPerfil).map((key) => {
            return key[0].charAt(0).toUpperCase() + key.slice(1);
        });
        perfilObject.values = Object.values(userPerfil).map((value) => value);

        formDelete = "Excluir perfil";
    }

    return (
        <Box
            sx={{
                height: "89.9vh",
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
            }}
        >
            <Box sx={{ display: "flex" }}>
                <Avatar
                    sx={{
                        backgroundColor: "primary.main",
                        p: 7.5,
                        fontSize: 80,
                    }}
                >
                    {userPerfil?.nome?.[0] || <>?</>}
                </Avatar>
                <Box sx={{ position: "absolute", right: { xs: 2, md: 20 } }}>
                    <MiniMenu
                        options={[formDelete || "Acção indisponível..."]}
                        sx={{ marginLeft: -1 }}
                    />
                </Box>
            </Box>
            <Box sx={{}}>
                <List sx={{ padding: 0, margin: 0 }}>
                    {userPerfil?.nome ? (
                        <PeoplePerfilItem
                            values={perfilObject.values}
                            keys={perfilObject.keys}
                        />
                    ) : (
                        <Typography variant="h5">
                            Perfil inexistente...
                        </Typography>
                    )}
                </List>
            </Box>
        </Box>
    );
}

export function PeoplePerfilItem({ values, keys }) {
    return (
        <>
            {values.map((value, index) => {
                const Icon = iconMapper[keys[index].toLowerCase()];
                return (
                    <ListItem
                        sx={{ p: 0, marginBottom: "2px" }}
                        key={keys[index]}
                    >
                        <ListItemButton sx={{ borderRadius: 2 }}>
                            <ListItemIcon>
                                <Icon size={20} />
                            </ListItemIcon>
                            <Box sx={{ ml: -2 }}>
                                <Typography variant="caption" fontSize={"1rem"}>{keys[index]}</Typography>
                                {keys[index] === "DataCadastro" ? (
                                    <ListItemText
                                        sx={{ margin: 0 }}
                                        primary={new Date(value).toLocaleString(
                                            "pt-BR",
                                        )}
                                    />
                                ) : (
                                    <ListItemText
                                        sx={{ margin: 0 }}
                                        primary={value}
                                    />
                                )}
                            </Box>
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </>
    );
}
