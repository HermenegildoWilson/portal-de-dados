import { FaSpinner } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CircularProgress from '@mui/material/CircularProgress';

export default function MyLoader({ sx, type }) {
    if (type === "small") {
        return <FaSpinner className={`animate-spin ${sx}`} />;
    }
    return (
        <CircularProgress enableTrackSlot size={40} />
    );
}