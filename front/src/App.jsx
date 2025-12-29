import "./index.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

import AlertProvider from "./providers/AlertProvider";
import AuthProvider from "./providers/AuthProvider";
import AuthGate from "./gates/AuthGate";
import AuthenticatedProviders from "./providers/AuthenticatedProviders";

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <AlertProvider>
                <AuthProvider>
                    <AuthGate>
                        <AuthenticatedProviders>
                            <BrowserRouter>
                                <AppRoutes />
                            </BrowserRouter>
                        </AuthenticatedProviders>
                    </AuthGate>
                </AuthProvider>
            </AlertProvider>
        </ThemeProvider>
    );
}
