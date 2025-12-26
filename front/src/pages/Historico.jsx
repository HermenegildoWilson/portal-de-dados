import { useEffect, useState } from "react";

import { api } from "../api/axios";
import ModalDateTimePicker from "../components/ModalDateTimePicker";
import MyLineChart from "../components/chart/MyLineChart";
import PageHeader from "../components/typography/PageHeader";
import { Typography } from "@mui/material";

export default function Historico() {
    const [charts, setCharts] = useState([]);

    async function getSensorHistory(params) {
        try {
            const { data } = await api.get(
                `/api/sensors/${params?.sensor_id || "esp32_01"}/history`,
                {
                    params: params,
                }
            );

            setCharts(data.data);

            return data;
        } catch (error) {
            console.error("Erro ao buscar histórico:", error);
            return error;
        }
    }
    const getPoints = () => {
        if (window.innerWidth >= 768) {
            return 8;
        } else {
            return 5;
        }
    };

    useEffect(() => {
        getSensorHistory();
    }, []);

    return (
        <>
            <PageHeader>
                <Typography variant={"h6"}>Histórico de Monitorização Ambiental</Typography>
            </PageHeader>
            <ModalDateTimePicker onApply={getSensorHistory} />

            <MyLineChart chartsData={charts} points={getPoints()} />
        </>
    );
}
