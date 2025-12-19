import { useState } from "react";
import NavBar from "../partials/template/NavBar";
import Header from "../partials/template/Header";

export default function AppLayout({ children }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="h-screen flex">
            <NavBar state={{ open, setOpen }} />

            <div className="flex-1 flex flex-col bg-(--color-branco-suave)">
                <Header state={{ open, setOpen }} />
                <main className="flex-1 overflow-auto p-5 pt-0">
                    {children}
                </main>
            </div>
        </div>
    );
}
