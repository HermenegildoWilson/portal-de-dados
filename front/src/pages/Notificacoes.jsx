import PageTitle from "../components/typography/PageTitle";

export default function Notificacoes() {
    return (
        <>
            <PageTitle Title={"Notificações"} />
            <div className="p-5">
                <p className="text-[1.2rem]">Sem Notificações</p>
            </div>
        </>
    );
}
