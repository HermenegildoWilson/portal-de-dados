import { Link } from "react-router-dom";

export default function MyLinkButton({ sx, title, to }) {
    return (
        <Link to={to} className={`bg-(--color-blue-claro) text-white p-2 rounded-md ${sx}`}>
            {title}
        </Link>
    );
}
