import * as React from "react";
import { useSensors } from "../hooks/useSensors";
import PageHeader from "../components/typography/PageHeader";
import {
    GraficoTemporal,
    MedidorIndividual,
    parameterOptions,
} from "../components/chart/DataDisplay";

import { Card, Container, Typography } from "@mui/material";
import FilterBar from "../components/FilterBar";

const max_points = 10;

export default function Main() {
    const { sensors } = useSensors();
    const [sensorReading, setSensorReading] = React.useState({
        Temperatura: 0.0,
        Humidade: 0.0,
        "Pressão do Ar": 0.0,
        "Qualidade do Ar": 0.0,
        timestamp: "DD:MM:AAAA",
    });
    const [actualParameter, setActualParameter] = React.useState(
        parameterOptions["Temperatura"]
    );
    const [sensorReadingHistory, setSensorReadingHistory] = React.useState({
        Temperatura: [],
        Humidade: [],
        "Pressão do Ar": [],
        "Qualidade do Ar": [],
    });
    const [sensorReadingTimeLabels, setSensorReadingTimeLabels] =
        React.useState([]);

    React.useEffect(() => {
        const data = sensors.esp32_01;
        if (!data) return;

        setSensorReading({
            Temperatura: data.temperature,
            Humidade: data.humidity,
            "Pressão do Ar": data.pressure,
            "Qualidade do Ar": data.air_quality,
            timestamp: new Date(data.created_at).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }),
        });

        setSensorReadingHistory((prev) => ({
            Temperatura: [...prev.Temperatura, data.temperature].slice(-max_points),
            Humidade: [...prev.Humidade, data.humidity].slice(-max_points),
            "Pressão do Ar": [...prev["Pressão do Ar"], data.pressure].slice(
                -max_points
            ),
            "Qualidade do Ar": [
                ...prev["Qualidade do Ar"],
                data.air_quality,
            ].slice(-max_points),
        }));

        setSensorReadingTimeLabels((prev) => {
            const time = new Date(data.created_at).toLocaleTimeString("pt-PT", {
                hour12: false,
            });

            return [...prev, time].slice(-max_points);
        });
    }, [sensors]);

    const config = parameterOptions[actualParameter];

    const switchParameter = (value) => {
        setActualParameter(parameterOptions[value]);
    };

    return (
        <>
            <PageHeader sx={"flex flex-wrap justify-between items-center"}>
                <Typography variant={"h6"}>
                    Monitoramento em Tempo Real
                </Typography>
                <div className="pt-1 pb-1 flex flex-auto justify-end items-center pr-2">
                    <FilterBar onApply={switchParameter} />
                </div>
            </PageHeader>
            <Card elevation={3} sx={{ marginTop: 1 }}>
                <Container>
                    <Typography
                        variant="subtitle2"
                        sx={{ textAlign: "right", paddingTop: 1 }}
                        gutterBottom
                    >
                        {sensorReading.timestamp}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ textAlign: "center" }}
                        gutterBottom
                    >
                        {actualParameter.name}
                    </Typography>

                    <MedidorIndividual
                        value={sensorReading[actualParameter.name]}
                        warning_value={actualParameter.warning_value}
                        high_value={actualParameter.high_value}
                        unit={actualParameter.unit}
                        max_value={actualParameter.max_value}
                        min_value={actualParameter.min_value}
                    />

                    <GraficoTemporal
                        labels={sensorReadingTimeLabels}
                        values={sensorReadingHistory[actualParameter.name]}
                        warning_value={actualParameter.warning_value}
                        high_value={actualParameter.high_value}
                        unit={actualParameter.unit}
                    />
                </Container>
            </Card>
        </>
    );
}
