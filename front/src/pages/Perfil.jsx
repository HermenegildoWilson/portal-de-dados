import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { iconMapper } from "../utils/iconMapper";
import { useAuth } from "../hooks/useAuth";
import MiniMenu from "../components/modal/MiniMenu";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppLoader from "../components/feedback/AppLoader";
import { api } from "../api/axios";
import { FaQuestionCircle } from "react-icons/fa";

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
                return setUserPerfil(data.data[0]);
            } else {
                return setUserPerfil(null);
            }
        } catch (error) {
            setUserPerfil(null);
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
            <div className="flex-1 flex flex-col items-center justify-center gap-3">
                <p>Carregando ...</p>
                <AppLoader />
            </div>
        );
    }

    let perfilObject = { keys: [], values: [] };
    let formDelete;

    if (userPerfil) {
        perfilObject.keys = Object.keys(userPerfil).map((key) => {
            return key[0].charAt(0).toUpperCase() + key.slice(1);
        });
        perfilObject.values = Object.values(userPerfil).map((value) => value);
        formDelete = "Excluir perfil";
    }

    return (
        <div className="flex-1 " style={{ margin: 0, padding: 0 }}>
            <div className="flex-auto flex relative justify-center mt-2">
                <div className="rounded-full w-30 h-30 flex justify-center items-center text-7xl bg-(--color-primary) text-[#f4f6f8] mt-4 mb-2">
                    {userPerfil?.nome[0] || <FaQuestionCircle />}
                </div>
                <div className="absolute right-0">
                    <MiniMenu
                        options={[formDelete || "Acção indisponível..."]}
                        sx={{ marginLeft: -1 }}
                    />
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <List sx={{ padding: 0, margin: 0 }}>
                    {userPerfil ? (
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
            </div>
        </div>
    );
}

export function PeoplePerfilItem({ values, keys }) {
    return (
        <>
            {values.map((value, index) => {
                const Icon = iconMapper[keys[index].toLowerCase()];
                return (
                    <ListItem sx={{ p: 0, marginBottom: "2px" }} key={keys}>
                        <ListItemButton sx={{ borderRadius: 2 }}>
                            <ListItemIcon>
                                <Icon
                                    size={20}
                                    className="text-gray-600"
                                />
                            </ListItemIcon>
                            <div className="-ml-5">
                                <p>{keys[index]}</p>
                                <ListItemText
                                    sx={{ margin: 0 }}
                                    primary={value}
                                />
                            </div>
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </>
    );
}
