import { useState } from "react";

import NavBar from "../partials/template/NavBar";
import Header from "../partials/template/Header";
import { Typography } from "@mui/material";

export default function AppLayout({ children }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="h-screen flex">
            <NavBar state={{ open, setOpen }} />

            <>
                <div className="flex-1 flex flex-col bg-(--color-branco-suave)">
                    <Header state={{ open, setOpen }} />
                    <main className="flex-1 overflow-auto">{children}</main>
                </div>
            </>
        </div>
    );
}

export function PageTitle({ Title }) {
    const getVariant = () => {
        if (window.innerWidth >= 768) {
            return "h5";
        } else {
            return "h6";
        }
    };
    return (
        <div className="sticky top-0 bg-(--color-branco-suave) p-3 z-50">
            <Typography variant={getVariant()} gutterBottom>
                {Title}
            </Typography>
        </div>
    );
}
