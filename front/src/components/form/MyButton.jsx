import Button from "@mui/material/Button";
export default function MyButton({
    children,
    type = "contained",
    handleClick,
    disabled = false,
    args,
    sx,
    customClass
}) {
    return (
        <button disabled={disabled} className={`cursor-pointer w-full ${customClass}`}>
            <Button
                variant={type}
                disabled={disabled}
                onClick={handleClick}
                sx={{
                    textTransform: "none",
                    width: "100%",
                    backgroundColor: "var(--color-primary)",
                    fontSize: "1rem",
                    ...sx,
                }}
                {...args}
            >
                {children}
            </Button>
        </button>
    );
}
