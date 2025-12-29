//Layout.jsx
import React, { useRef, useState } from "react";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import theme from "../../theme";
import Header from "./Header";
import Sidebar from "./Sidebar/Sidebar";
import ScrollTop from "./ScrollTop";

const drawerWidth = 0;
const closedWidth = -22; //`calc(${theme.spacing(7)} + 1px)`;

export default function Layout() {
    const [open, setOpen] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const boxRef = useRef(null); // Ref para o box principal
    const toggleDrawer = () => setOpen(!open);

    return (
        <Box sx={{ display: "flex", height: "100vh", border: "1px solid" }}>
            <CssBaseline />

            <Header
                open={open}
                toggleDrawer={toggleDrawer}
                isMobile={isMobile}
            />

            <Sidebar
                open={open}
                toggleDrawer={toggleDrawer}
                isMobile={isMobile}
            />

            <Box
                ref={boxRef}
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 1,
                    mt: 8,
                    overflowY: "scroll",
                    transition: theme.transitions.create(["margin"], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.standard,
                    }),
                    ml: !isMobile ? (open ? drawerWidth : closedWidth) : 0,
                }}
            >
                <Outlet />
                <ScrollTop target={() => boxRef.current} />
            </Box>
        </Box>
    );
}
