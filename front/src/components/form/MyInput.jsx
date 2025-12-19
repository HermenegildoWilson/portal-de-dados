import { TextField } from "@mui/material";

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
