import { FaSpinner } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function MyLoader({ sx, type }) {
    if (type === "small") {
        return <FaSpinner className={`animate-spin ${sx}`} />;
    }
    return (
        <AiOutlineLoading3Quarters className={`animate-spin text-4xl ${sx}`} />
    );
}
