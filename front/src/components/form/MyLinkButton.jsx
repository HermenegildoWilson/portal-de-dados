import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function MyLinkButton({
    children,
    sx,
    to,
    type,
    disabled,
    handleClick,
    endIcon,
    customClass
}) {
    return (
        <div className={customClass}>
            <Link to={to}>
                <Button
                    endIcon={endIcon}
                    variant={type}
                    disabled={disabled}
                    onClick={handleClick}
                    sx={{
                        textTransform: "none",
                        width: "100%",
                        //backgroundColor: "var(--color-primary)",
                        ...sx,
                    }}
                >
                    {children}
                </Button>
            </Link>
        </div>
    );
}
