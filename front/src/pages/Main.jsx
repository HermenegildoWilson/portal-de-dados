import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";
import { api, useAuthProvider } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

export default function BasicArea() {
    const [readings, setReadings] = useState([]);
    const { user } = useAuthProvider();

    useEffect(() => {
        async function getData() {
            try {
                const response = await api("/api/sensores");
                const novaLeitura = response.data.ultimaLeitura;

                setReadings([novaLeitura]);
            } catch (error) {
                console.error("Erro ao buscar dados do sensor:", error);
            }
        }

        getData();
        const interval = setInterval(getData, 5000);
        return () => clearInterval(interval);
    }, []);

    const temperatureData = readings.temperature;
    const humidityData = readings.humidity;
    const pressureData = readings.pressure;
    const altitudeData = readings.altitude;

    if (!user) {
        return <Navigate to="/home" />;
    }

    return (
        <LineChart
            series={[
                {
                    label: "Dado",
                    data: [30, 100, 30, 140],
                    area: true,
                    showMark: false,
                },
            ]}
            height={300}
            xAxis={[{ data: [1, 50, 100, 150] }]}
            yAxis={[{ min: 0, max: 500, width: 80 }]}
            skipAnimation
        />
    );
}
