import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function NotFound() {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Não Encontrada.
            </Typography>
            <Paper
                sx={{
                    p: 3,
                    height: 300,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                Not Found...
            </Paper>
        </Box>
    );
}
