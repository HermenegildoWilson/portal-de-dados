import { useEffect, useState, useMemo } from "react";
import { api } from "../api/axios";
import { Box, Card, Typography, Divider, Grid, Chip } from "@mui/material";
import { WarningAmber, InfoOutlined } from "@mui/icons-material";
import ModalDateTimePicker from "../components/modal/ModalDateTimePicker";
import {
    GraficoTemporal,
    parameterOptions,
} from "../components/chart/DataDisplay";

export default function Historico() {
    const [charts, setCharts] = useState([]);
    const [sensorId, setSensorId] = useState("esp32_01");
    const [dateRange, setDateRange] = useState({ start: null, end: null });
    const [activeParam, setActiveParam] = useState("Temperatura");
    const [loading, setLoading] = useState(false);

    const config = useMemo(() => parameterOptions[activeParam], [activeParam]);

    // Buscar histórico do sensor
    async function getSensorHistory(params = {}) {
        try {
            setLoading(true);
            const { data } = await api.get(`/api/sensors/${sensorId}/history`, {
                params,
            });

            setCharts(data.data || []);
            setLoading(false);
        } catch (error) {
            console.error("Erro ao buscar histórico:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getSensorHistory();
    }, [sensorId]);

    // Preparar dados para o gráfico
    const history = useMemo(() => {
        const labels = charts.map((item) =>
            new Date(item.created_at).toLocaleString("pt-PT", { hour12: false })
        );
        const values = charts.map((item) => item[config.key.toLowerCase()]); // supondo que o campo da API está em minúscula
        return { labels, values };
    }, [charts, config.key]);

    // Maior e menor valor
    const maxValue = history.values.length ? Math.max(...history.values) : null;
    const minValue = history.values.length ? Math.min(...history.values) : null;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, p: 2 }}>
            {/* Seleção de parâmetro */}
            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                    overflowX: "auto",
                }}
            >
                {Object.keys(parameterOptions).map((key) => (
                    <Chip
                        key={key}
                        label={key}
                        onClick={() => setActiveParam(key)}
                        color={activeParam === key ? "primary" : "default"}
                        variant={activeParam === key ? "filled" : "outlined"}
                        icon={parameterOptions[key].icon}
                        sx={{ fontWeight: "bold", flexShrink: 0 }}
                    />
                ))}
            </Box>

            {/* Filtro de datas */}
            <ModalDateTimePicker value={dateRange} onChange={setDateRange} />

            {/* Gráfico */}
            {history.labels.length ? (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                border: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 1,
                                }}
                            >
                                <Typography variant="h6" fontWeight="bold">
                                    {config.name} - Histórico
                                </Typography>
                                {maxValue >= config.warning_value && (
                                    <Chip
                                        icon={<WarningAmber />}
                                        label="Valor elevado"
                                        color="warning"
                                        size="small"
                                        sx={{ fontWeight: "bold" }}
                                    />
                                )}
                            </Box>

                            <GraficoTemporal
                                labels={history.labels}
                                values={history.values}
                                config={config}
                            />

                            <Divider sx={{ my: 1 }} />

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mt: 1,
                                }}
                            >
                                <Typography variant="body2">
                                    <InfoOutlined
                                        sx={{
                                            fontSize: 16,
                                            verticalAlign: "middle",
                                            mr: 0.5,
                                        }}
                                    />
                                    Máx:{" "}
                                    <b>
                                        {maxValue ?? "--"}
                                        {config.unit}
                                    </b>
                                </Typography>
                                <Typography variant="body2">
                                    <InfoOutlined
                                        sx={{
                                            fontSize: 16,
                                            verticalAlign: "middle",
                                            mr: 0.5,
                                        }}
                                    />
                                    Mín:{" "}
                                    <b>
                                        {minValue ?? "--"}
                                        {config.unit}
                                    </b>
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            ) : (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 4 }}
                >
                    Nenhum dado disponível para o período selecionado.
                </Typography>
            )}
        </Box>
    );
}
