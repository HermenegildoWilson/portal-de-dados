import { InputAdornment, TextField } from "@mui/material";

export default function MyInput({
    sx,
    id,
    name,
    type,
    label,
    value,
    handleChangeInput,
    hidden,
    key,
}) {
    return (
        <TextField
            id={id}
            name={name}
            type={type}
            label={label}
            value={value}
            sx={{ ...sx }}
            hidden={hidden}
            key={key}
            onChange={(e) => {
                handleChangeInput(e);
            }}
        />
    );
}

export function StyledInput({ label, icon, InputProps = {}, ...props }) {
    return (
        <TextField
            fullWidth
            label={label}
            variant="outlined"
            InputProps={{
                startAdornment: icon && (
                    <InputAdornment position="start" sx={{ mr: 1 }}>
                        {icon}
                    </InputAdornment>
                ),
                ...InputProps,
            }}
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    "& fieldset": { borderColor: "rgba(0,0,0,0.15)" },
                    "&:hover fieldset": { borderColor: "primary.main" },
                },
            }}
            {...props}
        />
    );
}
