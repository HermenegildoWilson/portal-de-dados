import { Box, Typography } from "@mui/material";
import AppLoader from "../components/feedback/AppLoader";
import { useAuth } from "../hooks/useAuth";

export default function AuthGate({ children }) {
    const { appState } = useAuth();

    if (appState === "loading") {
        return (
            <Box
                sx={{
                    height: "89.9vh",
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                }}
            >
                <Typography variant="body1" fontSize={"1.3rem"}>
                    Carregando...
                </Typography>
                <AppLoader />
            </Box>
        );
    }

    return <> {children} </>;
}
