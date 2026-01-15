import { iconMapper } from "../../utils/iconMapper";
export const parameterOptions = {
    Temperatura: {
        key: "Temperatura",
        field: "temperature",
        name: "Temperatura",
        icon: iconMapper["Temperatura"],
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
        icon: iconMapper["Humidade"],
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
        icon: iconMapper["Pressão do Ar"],
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
        icon: iconMapper["Qualidade do Ar"],
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
