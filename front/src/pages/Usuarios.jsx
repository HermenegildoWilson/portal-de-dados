import {
    Card,
    Container,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { iconMapper } from "../utils/iconMapper";
import { FaPlus, FaUserAltSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { api } from "../api/axios";

export default function Usuarios() {
    const [usuario, setUsuario] = useState(null);
    async function getUsuario() {
        try {
            const url = "/user/usuarios";
            const { data } = await api.get(url);
            return setUsuario(data.data);
        } catch (error) {
            setUsuario([]);
        }
    }

    useEffect(() => {
        getUsuario();
    }, []);

    return (
        <div className="flex-1 md:p-5">
            <Card elevation={3} sx={{ borderRadius: "9px" }}>
                <Container sx={{ py: 3 }}>
                    <Typography variant="h5">
                    Usuarios cadastrado
                </Typography>
                    <List>
                        {!usuario || usuario.length === 0 ? (
                            <ListItem
                                sx={{ p: 0, marginBottom: "2px" }}
                                key={"none"}
                            >
                                <ListItemButton sx={{ borderRadius: 2 }}>
                                    <ListItemIcon>
                                        <FaUserAltSlash
                                            size={20}
                                            className="text-(--color-secondary)"
                                        />
                                    </ListItemIcon>
                                    <div className="-ml-5">
                                        <p>Sem usuarios cadastradas</p>
                                    </div>
                                </ListItemButton>
                            </ListItem>
                        ) : (
                            usuario.map((usuario) => (
                                <PeopleListItem usuario={usuario} />
                            ))
                        )}
                    </List>
                </Container>
            </Card>
        </div>
    );
}

export function PeopleListItem({ usuario }) {
    const Icon = iconMapper.perfil
    const to = `/perfil/${usuario.id}`;

    return (
        <Link to={to}>
            <ListItem sx={{ p: 0, marginBottom: "2px" }} key={usuario.id}>
                <>
                    <ListItemButton
                        sx={{
                            borderRadius: 2,
                        }}
                    >
                        <ListItemIcon>
                            <Icon
                                size={20}
                                className="text-(--color-secondary)"
                            />
                        </ListItemIcon>
                        <div className="-ml-6 w-full flex justify-between p-2">
                            <ListItemText
                                sx={{ margin: 0 }}
                                primary={usuario.nome}
                            />
                            <ListItemText
                                sx={{
                                    margin: 0,
                                    textAlign: "right",
                                    color: "var(--color-primary)",
                                    fontWeight: "bold",
                                }}
                                primary={usuario.id}
                            />
                        </div>
                    </ListItemButton>
                </>
            </ListItem>
            <Divider />
        </Link>
    );
}
