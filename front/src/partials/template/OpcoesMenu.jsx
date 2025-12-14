import * as React from "react";
import Box from "@mui/material/Box";

import Menu from "@mui/material/Menu";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Divider } from "@mui/material";

import { Link } from "react-router-dom";
import { useAuthProvider } from "../../context/AuthProvider";
import { optionsMenu } from "../../utils/optionsMenu";
import { iconMapper } from "../../utils/iconMapper";
import MyButton from "../../components/MyButton";
import {
    MyList,
    MyListItem,
    MyListItemButton,
    MyListItemText,
    MyListItemIcon,
} from "../../components/MyListComponents";

export default function OpcoesMenu({ toggleDrawer }) {
    const { user } = useAuthProvider();
    let menuOptions = optionsMenu[user?.role || "public"];

    return (
        <>
            <Box
                sx={{ width: 280 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                className="h-screen pt-5 border border-gray-300"
            >
                <MyList>
                    {(user) && (
                        <>
                            <MyListItem key={"profile"}>
                                <MyListItemButton>
                                    <MyListItemIcon
                                        Icon={iconMapper["reg-circle-user"]}
                                    ></MyListItemIcon>

                                    <Link
                                        to={"/perfil"}
                                        className="-ml-5 w-full"
                                    >
                                        <MyListItemText
                                            text={user.nome}
                                            className="text-gray-700"
                                        />
                                    </Link>
                                </MyListItemButton>
                            </MyListItem>
                            <Link to={"/logout"}>Sair</Link>
                            <Divider />
                        </>
                    )}
                    {menuOptions.map((opt) => {
                        const Icon = iconMapper[opt.icone];
                        return (
                            <MyListItem key={opt.descricao}>
                                <MyListItemButton>
                                    <MyListItemIcon
                                        Icon={Icon}
                                    ></MyListItemIcon>

                                    <Link
                                        to={opt.link}
                                        className="-ml-5 w-full"
                                    >
                                        <MyListItemText text={opt.titulo} />
                                    </Link>
                                </MyListItemButton>
                            </MyListItem>
                        );
                    })}
                </MyList>
            </Box>
        </>
    );
}

export function ButtonDetails() {
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <MyButton
                        title={"Entrar"}
                        args={{ ...bindTrigger(popupState) }}
                    />

                    <Menu {...bindMenu(popupState)} className="mt-2">
                        {optionsMenu.login.map((opt) => (
                            <MyListItem
                                handleClick={popupState.close}
                                sx={{ marginBottom: "2px" }}
                                key={opt.titulo}
                            >
                                <MyListItemButton>
                                    <Link to={opt.link}>
                                        {opt.titulo}
                                    </Link>
                                </MyListItemButton>
                            </MyListItem>
                        ))}
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
}
