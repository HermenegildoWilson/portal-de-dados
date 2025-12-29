import { FaSpinner } from "react-icons/fa6";
import CircularProgress from "@mui/material/CircularProgress";

export default function AppLoader({ type }) {
    if (type === "small") {
        return <FaSpinner className={`ml-2 animate-spin`} size={20} />;
    }
    return <CircularProgress enableTrackSlot size={40} />;
}