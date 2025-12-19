import { FaSpinner } from "react-icons/fa6";
import CircularProgress from '@mui/material/CircularProgress';

export default function AppLoader({ sx, type }) {
    if (type === "small") {
        return <FaSpinner className={`animate-spin ${sx}`} />;
    }
    return (
        <CircularProgress enableTrackSlot size={40} />
    );
}