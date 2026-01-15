import { useEffect } from "react";
import { useAlert } from "../hooks/useAlert";
import { useAuth } from "../hooks/useAuth";
import AppLoader from "../components/feedback/AppLoader";

export default function Logout() {
    const { logout } = useAuth();
    const { setAlert } = useAlert();

    useEffect(() => {
        const Logout = async () => {
            const data = await logout();
            console.log(data);
            

            if (data.success) {
                return setAlert({
                    type: "SHOW",
                    text: data.message,
                    style: "success",
                });
            }
            setAlert({
                type: "SHOW",
                text: data.message,
                style: "warning",
            });
        };
        Logout();
    }, []);

    return (
        <section className="h-[90vh] flex flex-col items-center justify-center col-span-2">
            <p className="text-xl mb-4">Saindo...</p>
            <AppLoader sx={"text-blue-500"} />
        </section>
    );
}
