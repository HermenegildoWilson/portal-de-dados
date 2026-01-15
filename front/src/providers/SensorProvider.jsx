import { useEffect, useReducer, useState } from "react";
import { SensorContext } from "../context/SensorContext";
import { socket } from "../services/socket";
import { api } from "../api/axios";
import AppLoader from "../components/feedback/AppLoader";
const initialState = {
    sensors: {},
};

function sensorReducer(state, action) {
    console.log("🧠 Reducer UPDATE_SENSOR:", action.type);

    switch (action.type) {
        case "INIT_SENSORS":
            return {
                ...state,
                sensors: action.sensorReading,
            };

        case "UPDATE_SENSOR":
            return {
                ...state,
                sensors: {
                    ...state.sensors,
                    [action.sensorReading.sensor_code]: {
                        ...state.sensors[action.sensorReading.sensor_code],
                        ...action.sensorReading,
                    },
                },
            };

        default:
            return state;
    }
}

export const getMySensors = async () => {
    try {
        const { data } = await api.get("/sensors/aloccation");
        return data.data;
    } catch (error) {
        return {
            esp32_01: {
                pais: "Angola",
                provincia: "Uíge",
                cidade: "Uíge",
            },
            esp32_02: {
                pais: "Angola",
                provincia: "Uíge",
                cidade: "Negage",
            },
            esp32_03: {
                pais: "Angola",
                provincia: "Uíge",
                cidade: "Songo",
            },
        };
    }
};

export default function SensorProvider({ children }) {
    const [state, dispatch] = useReducer(sensorReducer, initialState);
    const [sensorCodes, setSensorCodes] = useState(null);
    const [sensorLocation, setSensorLocation] = useState(null);
    const getSensorsCode = async () => {
        const response = await getMySensors();
        const codes = Object.keys(response).map((code) => code);
        setSensorLocation(response);
        setSensorCodes(codes);
    };

    useEffect(() => {
        getSensorsCode();
    }, []);

    useEffect(() => {
        socket.connect();
        socket.on("connect", () => {
            console.log("🟢 Socket conectado:", socket.id);

            socket.emit("subscribe", {
                sensors: sensorCodes || [],
            });
        });

        socket.on("connect_error", (err) => {
            console.error("🔴 Erro de conexão:", err.message);
        });

        socket.on("sensor:initial", ({ sensors }) => {
            dispatch({
                type: "INIT_SENSORS",
                sensorReading: sensors,
            });
        });

        socket.on("sensor:update", (sensorReading) => {
            dispatch({
                type: "UPDATE_SENSOR",
                sensorReading,
            });
        });

        return () => socket.disconnect();
    }, [sensorCodes]);

    if (!state.sensors || !sensorCodes || !sensorLocation) {
        return (
            <div className="border h-screen flex flex-col items-center justify-center gap-3">
                <p>Carregando ...</p>
                <AppLoader />
            </div>
        );
    }

    return (
        <SensorContext.Provider
            value={{ sensors: state.sensors, sensorCodes, sensorLocation }}
        >
            {children}
        </SensorContext.Provider>
    );
}
