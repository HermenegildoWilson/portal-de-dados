import ReactECharts from "echarts-for-react";
import { useMemo } from "react";

export const parameterOptions = {
    Temperatura: {
        name: "Temperatura",
        min_value: 0,
        max_value: 50,
        warning_value: 35,
        high_value: 40,
        unit: " °C",
        importance:
            "A temperatura influencia diretamente o conforto térmico, a saúde pública, o desempenho no trabalho, o consumo de energia, a agricultura e a segurança em situações de calor ou frio extremo.",
    },
    Humidade: {
        name: "Humidade",
        min_value: 0,
        max_value: 100,
        warning_value: 70,
        high_value: 85,
        unit: " %",
        importance:
            "A humidade afeta a qualidade do ar, o risco de doenças respiratórias, o crescimento de fungos, a conservação de alimentos e bens materiais, além de impactar o conforto e a saúde da população.",
    },
    "Pressão do Ar": {
        name: "Pressão do Ar",
        min_value: 900,
        max_value: 1050,
        warning_value: 985,
        high_value: 975,
        unit: " hPa",
        importance:
            "A pressão atmosférica está ligada a mudanças climáticas, tempestades, variações meteorológicas e pode afetar pessoas sensíveis, especialmente indivíduos com problemas respiratórios e cardiovasculares.",
    },
    "Qualidade do Ar": {
        name: "Qualidade do Ar",
        min_value: 0,
        max_value: 300,
        warning_value: 100,
        high_value: 150,
        unit: " AQI",
        importance:
            "A qualidade do ar impacta diretamente a saúde respiratória e cardiovascular, produtividade escolar e laboral, expectativa de vida, além de ser um indicador crítico para políticas ambientais e urbanas.",
    },
};


export function MedidorIndividual({
    value,
    warning_value,
    high_value,
    unit,
    min_value,
    max_value,
}) {
    const color =
        value >= high_value
            ? "#EF4444" // vermelho
            : value >= warning_value
            ? "#f9a825" // amarelo
            : "#22C55E"; // verde

    const option = {
        animation: true,

        // IMPORTANTE: reduz margens globais
        grid: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },

        series: [
            {
                type: "gauge",
                min: min_value,
                max: max_value,

                center: ["50%", "60%"],
                radius: "105%",

                axisLine: {
                    lineStyle: {
                        width: 14,
                        color: [[1, "#e0e0e0"]], // faixa base cinza
                    },
                },

                progress: {
                    show: true,
                    width: 14,
                    itemStyle: { color },
                },

                pointer: {
                    itemStyle: { color },
                },

                detail: {
                    valueAnimation: true,
                    formatter: `{value} ${unit}`,
                    fontSize: 20,
                    offsetCenter: [0, "66%"],
                    color,
                },

                data: [{ value }],
            },
        ],
    };

    return (
        <ReactECharts
            option={option}
            style={{ height: "195px", width: "100%", marginTop: -10 }} // RESPONSIVO
            opts={{ renderer: "svg" }} // melhora responsividade
        />
    );
}

export function GraficoTemporal({
    labels,
    values,
    warning_value,
    high_value,
    unit,
}) {
    const last = values[values.length - 1] || 0;

    const min = Math.min(...values);
    const max = Math.max(...values);

    const margin = 2; // FAIXA MAIS ABRANGENTE

    const option = {
        grid: {
            left: "6%",
            right: "4%",
            top: "8%",
            bottom: "12%",
        },

        xAxis: {
            type: "category",
            data: labels,
            boundaryGap: false,
            axisLabel: { rotate: 30 },
        },

        yAxis: {
            type: "value",
            min: +(min - margin).toFixed(1),
            max: +(max + margin).toFixed(1),
            splitNumber: 8,
            minInterval: 0.1,
            axisLabel: {
                formatter: (v) => v.toFixed(1) + `${unit}`,
            },
        },

        series: [
            {
                type: "line",
                smooth: true,
                data: values,

                lineStyle: {
                    width: 3,
                    color:
                        last >= high_value
                            ? "#EF4444"
                            : last >= warning_value
                            ? "#f9a825"
                            : "#22C55E",
                },

                itemStyle: {
                    color:
                        last >= high_value
                            ? "#EF4444"
                            : last >= warning_value
                            ? "#f9a825"
                            : "#22C55E",
                },

                areaStyle: {
                    opacity: 0.25,
                },
            },
        ],
    };

    return (
        <ReactECharts
            option={option}
            style={{ height: "290px", width: "100%" }} // RESPONSIVO
            opts={{ renderer: "svg" }}
        />
    );
}