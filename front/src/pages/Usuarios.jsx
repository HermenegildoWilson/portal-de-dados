import { PageTitle } from "../layouts/AppLayout";
export default function Usuarios() {
    return (
        <>
            <PageTitle Title={"Gestão de Usuarios"} />
            <div className="p-5">
                <p className="text-[1.2rem]">Sem Usuários cadastrados</p>
            </div>
        </>
    );
}
