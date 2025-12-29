import { useEffect, useState, useMemo } from "react";
import { useSensors } from "../hooks/useSensors";
import {
    GraficoTemporal,
    MedidorIndividual,
    parameterOptions,
} from "../components/chart/DataDisplay";

import {
    Box,
    Card,
    Chip,
    Container,
    Divider,
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import {
    AccessTime,
    LocationOn,
    MyLocation,
    WarningAmber,
} from "@mui/icons-material";

export default function Dashboard() {
    const { sensors } = useSensors();

    const maxPoints = 10;

    const [activeKey, setActiveKey] = useState("Temperatura");

    const initialHistory = Object.keys(parameterOptions).reduce(
        (acc, key) => ({ ...acc, [key]: [] }),
        { labels: [] }
    );

    const [reading, setReading] = useState({});
    const [history, setHistory] = useState(initialHistory);

    const config = useMemo(() => parameterOptions[activeKey], [activeKey]);

    useEffect(() => {
        const data = sensors?.esp32_01 || sensors?.esp32_02;
        if (!data) return;

        const timestamp = new Date(data.created_at);
        const timeLabel = timestamp.toLocaleTimeString("pt-PT", {
            hour12: false,
        });

        // Atualiza leitura atual
        const newReading = {};
        Object.values(parameterOptions).forEach((param) => {
            newReading[param.key] = data[param.field];
        });
        newReading["sensor_id"] = data["sensor_id"];

        newReading.timestamp = timestamp.toLocaleString("pt-BR");
        setReading(newReading);

        // Atualiza histórico genérico
        setHistory((prev) => {
            const next = { ...prev };

            Object.values(parameterOptions).forEach((param) => {
                next[param.key] = [...prev[param.key], data[param.field]].slice(
                    -maxPoints
                );
            });

            next.labels = [...prev.labels, timeLabel].slice(-maxPoints);
            return next;
        });
    }, [sensors]);

    return (
        <>
            <Box
                sx={{
                    bgcolor: "background.default",
                    display: "flex",
                    flexFlow: "column",
                }}
            >
                {/* CABEÇALHO */}
                <Box
                    sx={{
                        backgroundColor: "background.default",
                        py: 1,
                        zIndex: (theme) => theme.zIndex.appBar + 1,
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "background.paper",
                            borderBottom: "1px solid",
                            borderColor: "divider",
                            py: 1,
                            px: 2,
                            borderRadius: "10px",
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h5"
                                fontWeight="800"
                                color="primary.main"
                            >
                                Monitoramento
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                }}
                            >
                                <AccessTime sx={{ fontSize: 16 }} />
                                Última atualização: {reading.timestamp ?? "--"}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                }}
                            >
                                <MyLocation sx={{ fontSize: 16 }} />
                                Região: {reading.sensor_id ?? "--"}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flex: "auto",
                                justifyContent: "end",
                                flexWrap: "wrap",
                                gap: 1,
                            }}
                        >
                            {Object.keys(parameterOptions).map((key) => (
                                <Chip
                                    key={key}
                                    label={key}
                                    icon={parameterOptions[key].icon}
                                    onClick={() => setActiveKey(key)}
                                    color={
                                        activeKey === key
                                            ? "primary"
                                            : "default"
                                    }
                                    variant={
                                        activeKey === key
                                            ? "filled"
                                            : "outlined"
                                    }
                                    sx={{ fontWeight: "bold" }}
                                />
                            ))}
                        </Box>
                    </Box>
                </Box>
                {/* CONTEÚDO */}
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        
                        gap: 2,
                        pb: 2,
                    }}
                >
                    {/* MEDIDOR */}
                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: 4,
                            maxWidth: 350,
                            minWidth: 320,
                            borderColor: "divider",
                            mx: "auto",
                        }}
                    >
                        <Box sx={{ p: 3, textAlign: "center" }}>
                            <Typography
                                variant="overline"
                                color="text.secondary"
                                fontWeight="bold"
                            >
                                Leitura Instantânea
                            </Typography>
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                sx={{ mb: 2 }}
                            >
                                {config.name}
                            </Typography>
                            <MedidorIndividual
                                value={reading[activeKey] ?? 0}
                                config={config}
                            />
                            <Divider sx={{ my: 2 }} />
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ bgcolor: "grey.50", p: 1 }}
                            >
                                Limites:{" "}
                                <b>
                                    {config.warning_value}
                                    {config.unit}
                                </b>{" "}
                                (Aviso) |
                                <b>
                                    {" "}
                                    {config.high_value}
                                    {config.unit}
                                </b>{" "}
                                (Crítico)
                            </Typography>
                        </Box>
                    </Card>
                    {/* GRÁFICO */}
                    <Card
                        elevation={0}
                        sx={{
                            flex: "auto",
                            borderRadius: 4,
                            minWidth: 400,
                            borderColor: "divider",
                            mx: "auto",
                        }}
                    >
                        <Box
                            sx={{
                                p: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    mb: 2,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Typography variant="h6" fontWeight="bold">
                                    Tendência (Últimas Leituras)
                                </Typography>
                                {Number(reading[activeKey]) >=
                                    config.warning_value && (
                                    <Chip
                                        icon={<WarningAmber />}
                                        label="Nível Elevado"
                                        color="warning"
                                        size="small"
                                        sx={{ fontWeight: "bold" }}
                                    />
                                )}
                            </Box>
                            <GraficoTemporal
                                labels={history.labels}
                                values={history[activeKey]}
                                config={config}
                            />
                            <Box
                                sx={{
                                    mt: 1,
                                    p: 1.5,
                                    bgcolor: "grey.50",
                                    borderRadius: 2,
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    display="block"
                                >
                                    Exibindo os últimos {maxPoints} pontos de
                                    dados processados.
                                </Typography>
                            </Box>
                        </Box>
                    </Card>
                </Box>
            </Box>
        </>
    );
}
