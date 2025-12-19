import { Typography } from "@mui/material";

export default function PageTitle({ Title }) {
    const getVarint = () => {
        if (window.innerWidth >= 768) {
            return "h5";
        } else {
            return "h6";
        }
    };
    return (
        <div className="sticky top-0 bg-(--color-branco-suave) z-50 pt-3 pb-3">
            <Typography variant={getVarint()}>{Title}</Typography>
        </div>
    );
}
