import { createContext, useReducer } from "react";
import AuthProvider from "./context/AuthProvider";
import "./index.css";
import AppRouter from "./partials/AppRouter";
import MyAlert from "./components/MyAlert";
export const MyAlertContext = createContext(null);

export default function App() {
    const [openAlert, setOpenAlert] = useReducer(alertRedutor, {
        text: "",
        style: "success", // warning || error || success || info
        show: false, // true || false
    });

    return (
        <MyAlertContext.Provider value={{ state: { openAlert, setOpenAlert } }}>
            <MyAlert />
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </MyAlertContext.Provider>
    );
}

function alertRedutor(state, action) {
    switch (action.type) {
        case "SHOW":
            return {
                text: action.text || "Informação",
                style: action.style || "success",
                show: true,
            };

        case "HIDE":
            return { ...state, show: false };
        default:
            return state;
    }
}
