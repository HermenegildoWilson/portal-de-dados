import AppLoader from "../components/feedback/AppLoader";
import { useAuth } from "../hooks/useAuth";

export default function AuthGate({ children }) {
    const { appState } = useAuth();

    if (appState === "loading") {
        return (
            <div className="border h-screen flex flex-col items-center justify-center gap-3">
                <p>Carregando ...</p>
                <AppLoader />
            </div>
        );
    }

    return <> {children} </>;
}
