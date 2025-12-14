import * as React from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { MyAlertContext } from "../App";

export default function MyAlert() {
    const { openAlert, setOpenAlert } = React.useContext(MyAlertContext).state;

    React.useEffect(() => {
        if (openAlert.show) {
            const timer = setTimeout(() => {
                setOpenAlert({ type: "HIDE" }); // fecha automaticamente após o tempo definido
            }, 8000);
            return () => clearTimeout(timer);
        }
    }, [openAlert]);

    return (
        <div className="absolute bottom-8 left-5">
            <Collapse in={openAlert.show}>
                <Alert
                    severity={openAlert.style}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpenAlert({ type: "HIDE" });
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {openAlert.text}
                </Alert>
            </Collapse>
        </div>
    );
}
