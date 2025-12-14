import { TextField } from "@mui/material";

export default function MyForm({ children, sx }) {
    return (
        <form className={`grid gap-2 m-auto w-70 md:w-85 ${sx}`}>
            {children}
        </form>
    );
}

export function MyInput({
    sx,
    id,
    name,
    type,
    label,
    value,
    handleChangeInput,
    hidden
}) {
    return (
        <TextField
            id={id}
            name={name}
            type={type}
            label={label}
            value={value}
            sx={{...sx}}
            hidden={hidden}
            onChange={(e) => {
                handleChangeInput(e);
            }}
        />
    );
}
