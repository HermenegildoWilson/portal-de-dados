import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { LineChart } from "@mui/x-charts/LineChart";
import { Navigate } from "react-router-dom";
import { useAuthProvider } from "../context/AuthProvider";

const MAX_POINTS = 30; // últimos 5 minutos (10s cada)
const timeFormatter = Intl.DateTimeFormat(undefined, {
    minute: "2-digit",
    second: "2-digit",
});

// Simulação / adaptador da API
async function fetchSensorData() {
    return {
        temperatura: 25 + Math.random() * 3,
        humidade: 55 + Math.random() * 5,
        pressao: 1010 + Math.random() * 2,
        qualidadeAr: 40 + Math.random() * 5,
        timestamp: new Date(),
    };
}

export default function DashboardLiveCharts() {
    const { user } = useAuthProvider();

    const [data, setData] = React.useState({
        temperatura: [],
        humidade: [],
        pressao: [],
        qualidadeAr: [],
        timestamps: [],
    });

    const [maxValues, setMaxValues] = React.useState({
        temperatura: null,
        humidade: null,
        pressao: null,
        qualidadeAr: null,
    });

    // Atualização a cada 10s
    React.useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const reading = await fetchSensorData();

                setData((prev) => ({
                    temperatura: [
                        ...prev.temperatura,
                        reading.temperatura,
                    ].slice(-MAX_POINTS),
                    humidade: [...prev.humidade, reading.humidade].slice(
                        -MAX_POINTS
                    ),
                    pressao: [...prev.pressao, reading.pressao].slice(
                        -MAX_POINTS
                    ),
                    qualidadeAr: [
                        ...prev.qualidadeAr,
                        reading.qualidadeAr,
                    ].slice(-MAX_POINTS),
                    timestamps: [...prev.timestamps, reading.timestamp].slice(
                        -MAX_POINTS
                    ),
                }));

                setMaxValues((prev) => ({
                    temperatura:
                        prev.temperatura === null
                            ? reading.temperatura
                            : Math.max(prev.temperatura, reading.temperatura),
                    humidade:
                        prev.humidade === null
                            ? reading.humidade
                            : Math.max(prev.humidade, reading.humidade),
                    pressao:
                        prev.pressao === null
                            ? reading.pressao
                            : Math.max(prev.pressao, reading.pressao),
                    qualidadeAr:
                        prev.qualidadeAr === null
                            ? reading.qualidadeAr
                            : Math.max(prev.qualidadeAr, reading.qualidadeAr),
                }));
            } catch (error) {
                console.error("Erro ao buscar dados dos sensores:", error);
            }
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);

    if (!user) {
        return <Navigate to="/home" />;
    }

    // Função auxiliar para criar cada gráfico
    const renderChart = (label, seriesData, maxValue, yMin, yMax, unit) => (
        <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
                {label} — Máx Histórico: {maxValue?.toFixed(1)} {unit}
            </Typography>
            <LineChart
                height={200}
                series={[{ label, data: seriesData, showMark: false }]}
                xAxis={[
                    {
                        scaleType: "point",
                        data: data.timestamps,
                        valueFormatter: (value) =>
                            timeFormatter.format(new Date(value)),
                    },
                ]}
                yAxis={[{ min: yMin, max: yMax, width: 60 }]}
                skipAnimation
            />
        </Box>
    );

    return (
        <Box sx={{ width: "100%", p: 2 }}>
            <Typography variant="h5" gutterBottom>
                Dashboard Ambiental em Tempo Real
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    {renderChart(
                        "Temperatura (°C)",
                        data.temperatura,
                        maxValues.temperatura,
                        20,
                        35,
                        "°C"
                    )}
                </Grid>

                <Grid item xs={12} md={6}>
                    {renderChart(
                        "Humidade (%)",
                        data.humidade,
                        maxValues.humidade,
                        40,
                        80,
                        "%"
                    )}
                </Grid>

                <Grid item xs={12} md={6}>
                    {renderChart(
                        "Pressão (hPa)",
                        data.pressao,
                        maxValues.pressao,
                        1005,
                        1020,
                        "hPa"
                    )}
                </Grid>

                <Grid item xs={12} md={6}>
                    {renderChart(
                        "Qualidade do Ar (AQI)",
                        data.qualidadeAr,
                        maxValues.qualidadeAr,
                        0,
                        100,
                        "AQI"
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}
