import { Typography } from "@mui/material";
import PageHeader from "../components/typography/PageHeader";

export default function Notificacoes() {
    return (
        <>
            <PageHeader>
                <Typography variant={"h6"}>Notificações</Typography>
            </PageHeader>
            <div className="p-5">
                <p className="text-[1.2rem]">Sem Notificações</p>
            </div>
        </>
    );
}
