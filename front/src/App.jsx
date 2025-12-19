import "./index.css";
import AppRouter from "./partials/AppRouter";
import AlertProvider from "./providers/AlertProvider";
import AuthProvider from "./providers/AuthProvider";
import AuthGate from "./gates/AuthGate";
import AuthenticatedProviders from "./providers/AuthenticatedProviders";

export default function App() {
    return (
        <AlertProvider>
            <AuthProvider>
                <AuthGate>
                    <AuthenticatedProviders>
                        <AppRouter />
                    </AuthenticatedProviders>
                </AuthGate>
            </AuthProvider>
        </AlertProvider>
    );
}
