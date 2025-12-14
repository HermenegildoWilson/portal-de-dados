import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthProvider } from "../context/AuthProvider";
import MyLoader from "../components/MyLoader";
import { MyAlertContext } from "../App"
import { useContext } from "react";

export default function Logout() {
    const { logout, user } = useAuthProvider();
    const { setOpenAlert } = useContext(MyAlertContext).state

    useEffect(() => {
        const Logout = async () => {
            const response = await logout();

            if (response.success) {
                return setOpenAlert({ type: "SHOW", text: response.message, style: "success" });
            }
            setOpenAlert({ type: "SHOW", text: response.message, style: "warning" });
        };
        Logout();
    }, []);

    if (!user) {
        return (
            <>
                <Navigate to="/home" replace />
            </>
        );
    }

    return (
        <section className="h-[90vh] flex flex-col items-center justify-center col-span-2">
            <p className="text-xl mb-4">Saindo...</p>
            <MyLoader sx={"text-blue-500"} />
        </section>
    );
}
