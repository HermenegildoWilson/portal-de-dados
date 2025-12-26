import { Typography } from "@mui/material";
import PageHeader from "../components/typography/PageHeader";

export default function Usuarios() {
    return (
        <>
            <PageHeader>
                <Typography variant={"h6"}>Gestão de Usuarios</Typography>
            </PageHeader>
            <div className="p-5">
                <p className="text-[1.2rem]">Sem Usuários cadastrados</p>
            </div>
        </>
    );
}
