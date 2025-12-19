import Button from "@mui/material/Button";
export default function MyButton({
    title,
    type = "contained",
    handleClick,
    disabled = false,
    args,
    sx,
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