import { Card, CardContent, Typography, Grid } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import AppLoader from "../../components/feedback/AppLoader";
import { LineChart } from "@mui/x-charts/LineChart";

export default function MySensorDisplay({ chartsData }) {
    // enquanto não houver dados inicializados do backend
    if (!chartsData || Object.keys(chartsData).length === 0) {
        return (
            <div className="bg-white rounded-md text-center p-4">
                <AppLoader />
            </div>
        );
    }

    const [displayedData, setDisplayedData] = useState([]);

    useEffect(() => {
        const data = chartsData?.esp32_01;
        if (!data) return;

        setDisplayedData((prev) => {
            const newPoint = {
                sensor_id: data.sensor_id,
                Temperatura: data.temperature,
                Humidade: data.humidity,
                "Pressao do Ar": data.pressure,
                "Qualidade do Ar": data.air_quality,
                timestamp: data.created_at,
            };

            const updated = [...prev, newPoint];
            if (updated.length > 50) updated.shift(); // mantém últimos 50 pontos
            return updated;
        });
    }, [chartsData]);

    const seriesData = useMemo(() => {
        const times = displayedData.map((d) => new Date(d.timestamp));
        return {
            x: times,
            series: [
                {
                    label: "Temperatura (°C)",
                    data: displayedData.map((d) => d.Temperatura ?? null),
                    curve: "smooth",
                    color: "#F97316",
                },
                {
                    label: "Humidade (%)",
                    data: displayedData.map((d) => d.Humidade ?? null),
                    curve: "smooth",
                    color: "#38BDF8",
                },
                {
                    label: "Pressão do Ar (hPa)",
                    data: displayedData.map((d) => d["Pressao do Ar"] ?? null),
                    curve: "smooth",
                    color: "#f6c85f",
                },
                {
                    label: "Qualidade do Ar",
                    data: displayedData.map(
                        (d) => d["Qualidade do Ar"] ?? null
                    ),
                    curve: "smooth",
                    color: "#22C55E",
                },
            ],
        };
    }, [displayedData]);

    // se ainda não temos pontos para desenhar
    if (displayedData.length === 0) {
        return (
            <div className="bg-white rounded-md text-center p-4">
                <AppLoader />
            </div>
        );
    }

    return (
        <Card elevation={3}>
            <CardContent>
                <Typography
                    variant="h6"
                    sx={{ textAlign: "center" }}
                    gutterBottom
                >
                    Dados dos Sensores
                </Typography>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {/* cards com últimos valores */}
                    <Grid item xs={6} md={3}>
                        <SimpleCard
                            title="Temperatura"
                            value={displayedData.at(-1)?.Temperatura}
                            unit="°C"
                            bg="#F97316"
                        />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <SimpleCard
                            title="Humidade"
                            value={displayedData.at(-1)?.Humidade}
                            unit="%"
                            bg="#38BDF8"
                        />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <SimpleCard
                            title="Pressão do Ar"
                            value={displayedData.at(-1)?.["Pressao do Ar"]}
                            unit="hPa"
                            bg="#f6c85f"
                        />
                    </Grid>
                    
                    <Grid item xs={6} md={3}>
                        <SimpleCard
                            title="Qualidade do Ar"
                            value={displayedData.at(-1)?.["Qualidade do Ar"]}
                            unit=""
                            bg="#22C55E"
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

function SimpleCard({ title, value, unit, bg }) {
    return (
        <div className={`border border-gray-300 rounded-md p-3 h-full flex flex-col justify-between`} style={{backgroundColor: bg}}>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-xl font-medium">
                {value ?? "—"} {unit}
            </p>
        </div>
    );
}
