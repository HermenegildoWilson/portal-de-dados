import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { Thermostat, WaterDrop, Air, Speed } from "@mui/icons-material";

export const parameterOptions = {
    Temperatura: {
        key: "Temperatura",
        field: "temperature",
        name: "Temperatura",
        icon: <Thermostat fontSize="small" />,
        min_value: 0,
        max_value: 50,
        warning_value: 30,
        high_value: 38,
        unit: "°C",
        color: "#EF4444",
    },
    Humidade: {
        key: "Humidade",
        field: "humidity",
        name: "Humidade",
        icon: <WaterDrop fontSize="small" />,
        min_value: 0,
        max_value: 100,
        warning_value: 70,
        high_value: 85,
        unit: "%",
        color: "#3B82F6",
    },
    "Pressão do Ar": {
        key: "Pressão do Ar",
        field: "pressure",
        name: "Pressão do Ar",
        icon: <Speed fontSize="small" />,
        min_value: 900,
        max_value: 1050,
        warning_value: 985,
        high_value: 975,
        unit: "hPa",
        color: "#8B5CF6",
    },
    "Qualidade do Ar": {
        key: "Qualidade do Ar",
        field: "air_quality",
        name: "Qualidade do Ar",
        icon: <Air fontSize="small" />,
        min_value: 0,
        max_value: 300,
        warning_value: 100,
        high_value: 150,
        unit: "AQI",
        color: "#10B981",
    },
};

export const initialHistory = Object.keys(parameterOptions).reduce(
    (acc, key) => ({ ...acc, [key]: [] }),
    { labels: [] }
);

export const MedidorIndividual = React.memo(({ value, config }) => {
    const { warning_value, high_value, unit, min_value, max_value, key } =
        config;

    const statusColor = useMemo(() => {
        const v = parseFloat(value);
        /*if (key === "Pressão do Ar")
            return v <= high_value ? "#EF4444" :
                   v <= warning_value ? "#F59E0B" : "#10B981";*/

        return v >= high_value
            ? "#EF4444"
            : v >= warning_value
            ? "#F59E0B"
            : "#10B981";
    }, [value, warning_value, high_value, key]);

    return (
        <ReactECharts
            option={{
                series: [
                    {
                        type: "gauge",
                        min: min_value,
                        max: max_value,
                        radius: "95%",
                        center: ["50%", "60%"],
                        startAngle: 200,
                        endAngle: -20,
                        axisLine: {
                            lineStyle: { width: 10, color: [[1, "#E5E7EB"]] },
                        },
                        progress: {
                            show: true,
                            width: 10,
                            itemStyle: { color: statusColor },
                        },
                        pointer: {
                            show: true,
                            length: "15%",
                            width: 6,
                            itemStyle: { color: statusColor },
                        },
                        axisTick: { show: false },
                        splitLine: { show: false },
                        axisLabel: { show: false },
                        detail: {
                            valueAnimation: true,
                            formatter: `{value}${unit}`,
                            fontSize: 22,
                            fontWeight: "bold",
                            offsetCenter: [0, "30%"],
                            color: "#1F2937",
                        },
                        data: [{ value }],
                    },
                ],
            }}
            style={{ height: 180 }}
            opts={{ renderer: "svg" }}
        />
    );
});

export const GraficoTemporal = React.memo(({ labels, values, config }) => (
    <ReactECharts
        option={{
            grid: { top: 20, right: 20, bottom: 40, left: 50 },
            tooltip: { trigger: "axis" },
            xAxis: {
                type: "category",
                data: labels,
                boundaryGap: false,
                axisLabel: { color: "#9CA3AF", fontSize: 11 },
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    formatter: `{value}${config.unit}`,
                    color: "#9CA3AF",
                    fontSize: 11,
                },
                splitLine: { lineStyle: { type: "dashed", color: "#F3F4F6" } },
            },
            series: [
                {
                    data: values,
                    type: "line",
                    smooth: true,
                    symbol: "circle",
                    symbolSize: 8,
                    itemStyle: { color: config.color },
                    lineStyle: { width: 3, color: config.color },
                    areaStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: config.color },
                                { offset: 1, color: "transparent" },
                            ],
                        },
                        opacity: 0.1,
                    },
                },
            ],
        }}
        style={{ height: 250 }}
        opts={{ renderer: "svg" }}
    />
));
