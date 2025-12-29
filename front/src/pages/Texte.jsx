import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function Dashboard() {
    return (
        <Box
            sx={{
                bgcolor: "background.default",
                overflowX: "hidden",
            }}
        >
            <Typography variant="h4" gutterBottom>
                Painel de Controle
            </Typography>
            <Paper
                sx={{
                    p: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                Gráficos e Estatísticas em tempo real.
            </Paper>
        </Box>
    );
}
