import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

import {
    Stack,
    Button,
    Alert,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tooltip,
    Box,
    Typography,
    Autocomplete,
    TextField,
} from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
export default function DateTimePickerValue({
    initialStart = dayjs(new Date(0)).subtract(1, "hour"),
    initialEnd = dayjs(),
    onApply,
}) {
    const [start, setStart] = useState(initialStart);
    const [end, setEnd] = useState(initialEnd);
    const [sensorId, setSensorId] = useState(null);
    const [intervalMinutes, setIntervalMinutes] = useState(5);

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);

    const invalid =
        !start ||
        !end ||
        !dayjs(start).isValid() ||
        !dayjs(end).isValid() ||
        dayjs(start).isAfter(dayjs(end)) ||
        !sensorId ||
        !intervalMinutes ||
        intervalMinutes < 1;

    const sensors = [
        { id: "esp32_01", label: "ESP32 — Sala Principal" },
        { id: "esp32_02", label: "ESP32 — Laboratório" },
        { id: "esp32_03", label: "ESP32 — Corredor" },
    ];

    const handleOpen = () => {
        setError(null);
        setOpen(true);
    };

    const handleClose = () => {
        if (!loading) {
            setOpen(false);
            setError(null);
        }
    };

    const handleApply = async () => {
        if (invalid) {
            setError("Verifique os campos antes de continuar.");
            return;
        }

        setLoading(true);
        setError(null);
        let success = false;

        try {
            const payload = {
                sensor_id: sensorId?.id || sensorId,
                from: start.toISOString(),
                to: end.toISOString(),
                interval: Number(intervalMinutes),
            };

            const res = await onApply(payload);

            success = res.success;

            if (!res.success) {
                console.error(err);
                setError(
                    err?.response?.data?.message ||
                        err?.message ||
                        "Erro ao aplicar filtros."
                );
            }
        } finally {
            setLoading(false);
            if (success) setOpen(false);
        }
    };

    const rangeSummary =
        start && end
            ? `${dayjs(start).format("DD/MM/YYYY HH:mm")} → ${dayjs(end).format(
                  "DD/MM/YYYY HH:mm"
              )}`
            : "Sem seleção";

    return (
        <Box display="" alignItems="center" gap={1}>
            <div className="pt-3 pb-3 flex justify-center items-center gap-1">
                <Tooltip title="Abrir filtros">
                    <IconButton
                        size="small"
                        onClick={handleOpen}
                        aria-label="filtros"
                    >
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
                <Typography variant="subtitle2" color="text.secondary">
                    {rangeSummary}
                </Typography>
            </div>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
                <DialogTitle>Filtrar Histórico</DialogTitle>

                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={2} mt={1}>
                            {/* SENSOR SELECT */}
                            <Autocomplete
                                options={sensors}
                                getOptionLabel={(o) => o.label}
                                value={sensorId}
                                onChange={(_, v) => setSensorId(v)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Sensor"
                                        fullWidth
                                    />
                                )}
                            />

                            {/* INTERVAL */}
                            <TextField
                                type="number"
                                label="Intervalo de leitura (minutos)"
                                value={intervalMinutes}
                                onChange={(e) =>
                                    setIntervalMinutes(e.target.value)
                                }
                                fullWidth
                                inputProps={{ min: 1 }}
                            />

                            {/* DATE PICKERS */}
                            
                            <MobileDateTimePicker label="Início" value={start} onChange={(v) => setStart(v)} />
                            <MobileDateTimePicker label="Fim" value={end} onChange={(v) => setEnd(v)} />

                            {invalid && (
                                <Alert severity="warning">
                                    Selecione um sensor, intervalo válido e
                                    datas corretas.
                                </Alert>
                            )}

                            {error && <Alert severity="error">{error}</Alert>}
                        </Stack>
                    </LocalizationProvider>
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2 }}>
                    <Button onClick={handleClose} disabled={loading}>
                        Cancelar
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleApply}
                        disabled={invalid || loading}
                    >
                        {loading ? "Enviando..." : "Aplicar"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
