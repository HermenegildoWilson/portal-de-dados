import { useEffect, useReducer } from "react";
import { SensorContext } from "../context/SensorContext";
import { socket } from "../services/socket";

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
                    [action.sensorReading.sensor_id]: {
                        ...state.sensors[action.sensorReading.sensor_id],
                        ...action.sensorReading,
                    },
                },
            };

        default:
            return state;
    }
}

export default function SensorProvider({ children }) {
    const [state, dispatch] = useReducer(sensorReducer, initialState);

    useEffect(() => {
        socket.connect();
        socket.on("connect", () => {
            console.log("🟢 Socket conectado:", socket.id);

            socket.emit("subscribe", {
                sensors: ["esp32_01"],
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
    }, []);

    return (
        <SensorContext.Provider value={state}>
            {children}
        </SensorContext.Provider>
    );
}
