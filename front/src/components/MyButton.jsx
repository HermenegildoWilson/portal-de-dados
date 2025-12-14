import Button from "@mui/material/Button";

export default function MyButton({
    title,
    type = "contained",
    handleClick,
    disabled = false,
    args,
    sx,
    href
}) {
    return (
        <Button
            variant={type}
            disabled={disabled}
            onClick={handleClick}
            sx={{textTransform: "none", fontSize: "1rem", ...sx}}
            {...args}
        >
            {title}
        </Button>
    );
}
