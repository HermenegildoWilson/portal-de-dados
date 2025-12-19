import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Divider } from "@mui/material";

import { useAuth } from "../../hooks/useAuth";
import { optionsMenu } from "../../utils/optionsMenu";
import { iconMapper } from "../../utils/iconMapper";
import MyButton from "../../components/form/MyButton";
import {
    MyList,
    MyListItem,
    MyListItemButton,
    MyListItemText,
    MyListItemIcon,
} from "../../components/MyListComponents";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function OpcoesMenu({ toggleDrawer }) {
    const { user } = useAuth();
    let menuOptions = optionsMenu[user?.role || "public"];
    let profileOptions = optionsMenu["profile"];
    return (
        <>
            <Box
                sx={{ width: 280 }}
                role="presentation"
                className="h-screen pt-4 border border-gray-300"
            >
                <MyList>
                    {user && (
                        <>
                            <MyListItem key={"profile"}>
                                <Accordion
                                    sx={{ padding: 0, boxShadow: "none" }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                        sx={{ padding: 0, width: 276 }}
                                    >
                                        <MyListItemButton>
                                            <MyListItemIcon
                                                Icon={
                                                    iconMapper[
                                                        "reg-circle-user"
                                                    ]
                                                }
                                            ></MyListItemIcon>

                                            <p className="-ml-5 w-full">
                                                <MyListItemText
                                                    text={user.nome}
                                                />
                                            </p>
                                        </MyListItemButton>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="ml-6 -mt-3">
                                            {profileOptions.map((opt) => {
                                                const Icon =
                                                    iconMapper[opt.icone];
                                                return (
                                                    <MyListItem
                                                        key={opt.descricao}
                                                        handleClick={toggleDrawer(
                                                            false
                                                        )}
                                                    >
                                                        <MyListItemButton>
                                                            <MyListItemIcon
                                                                Icon={Icon}
                                                            ></MyListItemIcon>

                                                            <Link
                                                                to={opt.link}
                                                                className="-ml-5 w-full"
                                                            >
                                                                <MyListItemText
                                                                    text={
                                                                        opt.titulo
                                                                    }
                                                                />
                                                            </Link>
                                                        </MyListItemButton>
                                                    </MyListItem>
                                                );
                                            })}
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </MyListItem>
                            <Divider sx={{ marginTop: 1 }} />
                        </>
                    )}
                    {menuOptions.map((opt) => {
                        const Icon = iconMapper[opt.icone];
                        return (
                            <MyListItem
                                key={opt.descricao}
                                handleClick={toggleDrawer(false)}
                            >
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
                                    <Link to={opt.link}>{opt.titulo}</Link>
                                </MyListItemButton>
                            </MyListItem>
                        ))}
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
}
