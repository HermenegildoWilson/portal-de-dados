import { useEffect, useState, useMemo } from "react";
import { api } from "../api/axios";
import { Box, Card, Typography, Divider, Grid, Chip } from "@mui/material";
import { WarningAmber, InfoOutlined, AccessTime, MyLocation } from "@mui/icons-material";
import ModalDateTimePicker from "../components/modal/ModalDateTimePicker";
import {
    GraficoTemporal,
    initialHistory,
    parameterOptions,
} from "../components/chart/DataDisplay";
import AppLoader from "../components/feedback/AppLoader";

export default function Historico() {
    const maxPoints = 10;
    const [history, setHistory] = useState({});
    const [activeParam, setActiveParam] = useState("Temperatura");

    const [pageState, setPageState] = useState("loading");

    const config = useMemo(() => parameterOptions[activeParam], [activeParam]);

    // Buscar histórico do sensor
    async function getSensorHistory(sensorId, params = {}) {
        try {
            const { data } = await api.get(`/api/sensors/${sensorId}/history`, {
                params,
            });
            const newHistory = {
                labels: [],
                Temperatura: [],
                Humidade: [],
                "Pressão do Ar": [],
                "Qualidade do Ar": [],
            };
            data.data.forEach((reading) => {
                Object.keys(newHistory).map((key) => {
                    key === "labels"
                        ? newHistory[key].push(
                              new Date(reading["timestamp"]).toLocaleTimeString(
                                  "pt-PT",
                                  {
                                      hour12: false,
                                  }
                              )
                          )
                        : newHistory[key].push(Number(reading[key]));
                });
            });
            setHistory(newHistory);
            setPageState("done");
        } catch (error) {
            console.error("Erro ao buscar histórico:", error);
            setPageState("error");
        }
    }

    useEffect(() => {
        getSensorHistory("esp32_01");
    }, []);

    if (pageState === "loading") {
        return (
            <div>
                <p>Buscando dados...</p>
                <AppLoader />
            </div>
        );
    }

    const maxValue = history[activeParam]?.length
        ? Math.max(...history[activeParam])
        : null;

    const minValue = history[activeParam]?.length
        ? Math.min(...history[activeParam])
        : null;

    const mediaValue = history[activeParam]?.length
        ? history[activeParam].reduce(
              (acumulador, valorAtual) => acumulador + valorAtual,
              0
          ) / history[activeParam].length
        : null;

    return (
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
                            Histórico
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
                            Data: {history[activeParam]?.at(-1)?.timestamp ?? "--"}
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
                            Região: {history[activeParam]?.at(-1)?.sensor_id ?? "--"}
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
                                onClick={() => setActiveParam(key)}
                                color={
                                    activeParam === key ? "primary" : "default"
                                }
                                variant={
                                    activeParam === key ? "filled" : "outlined"
                                }
                                sx={{ fontWeight: "bold" }}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
            <Card
                elevation={2}
                sx={{
                    flex: "auto",
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
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
                            Últimas Leituras
                            {history[activeParam]?.at(-1)}
                        </Typography>
                        {mediaValue >= config.warning_value && (
                            <Chip
                                icon={<WarningAmber />}
                                label="Nível Elevado"
                                color="warning"
                                size="small"
                                sx={{ fontWeight: "bold" }}
                            />
                        )}
                    </Box>
                    <Box sx={{ overflowX: "scroll" }}>
                        <div className="min-w-250">
                            <GraficoTemporal
                                labels={history.labels}
                                values={history[activeParam]}
                                config={config}
                            />
                        </div>
                    </Box>
                    <Divider sx={{ my: 1 }} />
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
                            Exibindo dados de DD-MM-AAAA
                        </Typography>
                    </Box>
                    Valor Mínimo:{minValue}
                    Valor Máximo:{maxValue}
                    Valor Médio:{mediaValue}
                </Box>
            </Card>
        </Box>
    );
}
