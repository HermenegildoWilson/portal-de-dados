import { MyLinkButton } from "../components/MyButton";
export default function Home() {
    return (
        <div className="mt-3 p-3 grid gap-4">
            <h1 className="w-75 text-2xl pl-4 sm:text-4xl sm:w-110">
                Monitorização Ambiental em Tempo Real
            </h1>
            <p className="text-(--color-cinza-medio) p-4 pt-2 pb-6 pl-1">
                Acompanhe dados precisos de temperatura, humidade, pressão
                atmosférica e qualidade do ar.
            </p>
            <div>
                <MyLinkButton title={"Ver dados em tempo real"} to={"/demo"} />
            </div>
        </div>
    );
}
