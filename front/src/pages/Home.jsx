import { Navigate } from "react-router-dom";
import MyLinkButton from "../components/form/MyLinkButton";
import { useAuth } from "../hooks/useAuth";
import PageHeader from "../components/typography/PageHeader";
import { Typography } from "@mui/material";

export default function Page() {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/" />;
    }

    return (
        <div className="mt-3 p-3 grid gap-4">
            <PageHeader>
                <Typography variant={"h6"}>Dados do Sensor</Typography>
            </PageHeader>

            <h1 className="text-2xl sm:text-4xl">
                Monitorização Ambiental em Tempo Real
            </h1>

            <p className="text-(--color-cinza-medio)">
                Acompanhe dados precisos de temperatura, humidade, pressão
                atmosférica e qualidade do ar.
            </p>

            <MyLinkButton title="Ver dados em tempo real" to="/demo" />
        </div>
    );
}
