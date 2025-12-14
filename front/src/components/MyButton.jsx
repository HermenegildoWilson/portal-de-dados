import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function MyButton({
    title,
    type = "contained",
    handleClick,
    disabled = false,
    args,
    sx,
    href,
}) {
    return (
        <Button
            variant={type}
            disabled={disabled}
            onClick={handleClick}
            sx={{ textTransform: "none", backgroundColor: "#38BDF8", fontSize: "1rem", ...sx }}
            {...args}
        >
            {title}
        </Button>
    );
}

export function MyLinkButton({ sx, title, to }) {
    return (
        <Link to={to} className={`bg-(--color-blue-claro) text-white p-3 rounded-md ${sx}`}>
            {title}
        </Link>
    );
}
