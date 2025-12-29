import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useScrollTrigger } from "@mui/material";
import { useEffect, useState } from "react";

export default function ScrollTop({ target }) {
    const [scrollTarget, setScrollTarget] = useState(null);

    useEffect(() => {
        if (!target) return;

        const resolved =
            typeof target === "function" ? target() : target;

        if (resolved) setScrollTarget(resolved);
    }, [target]);

    const trigger = useScrollTrigger({
        target: scrollTarget || undefined,
        disableHysteresis: true,
        threshold: 60,
    });

    const handleClick = () => {
        if (scrollTarget) {
            scrollTarget.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    return (
        <Zoom in={trigger}>
            <Fab
                onClick={handleClick}
                color="primary"
                size="small"
                sx={{
                    position: "fixed",
                    bottom: 24,
                    right: 30,
                    zIndex: 2000,
                }}
            >
                <KeyboardArrowUpIcon />
            </Fab>
        </Zoom>
    );
}
