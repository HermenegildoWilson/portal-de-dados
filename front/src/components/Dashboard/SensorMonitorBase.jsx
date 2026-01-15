import {
    Box,
    Card,
    Typography,
    Chip,
    Divider,
    Tooltip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    Autocomplete,
    TextField,
} from "@mui/material";

import {
    AccessTime,
    FilterList,
    MyLocation,
    WarningAmber,
    Verified,
} from "@mui/icons-material";

import { useState, useMemo } from "react";
import { parameterOptions } from "./config";
import MedidorIndividual from "./MedidorIndividual";
import GraficoTemporal from "./GraficoTemporal";

export default function SensorMonitorBase({
    title = "Monitoramento",
    sensorCodes = [],
    sensorLocation = {},
    sensorCode,
    onFilter,
    activeParam,
    onParamChange,
    actualReading = {},
    history = { labels: [] },
    args,
    maxPoints = 10,
}) {
    const [openDialog, setOpenDialog] = useState(false);
    const [sensorCodeValue, setSensorCodeValue] = useState(sensorCode);

    const config = useMemo(() => parameterOptions[activeParam], [activeParam]);

    const location = sensorLocation?.[sensorCode];

    const handleApplyFilter = () => {
        if ((sensorCodeValue && sensorCodeValue !== sensorCode) || title === "Histórico de Leituras") {
            onFilter({ newSensorCode: sensorCodeValue });
        }
        setOpenDialog(false);
    };

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* ================= CABEÇALHO ================= */}
            <Box sx={{ py: 1 }}>
                <Box
                    sx={{
                        backgroundColor: "background.paper",
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        py: 1,
                        px: 2,
                        borderRadius: 2,
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <Box>
                        <Typography
                            variant="h5"
                            fontWeight="800"
                            color="primary.main"
                            pb={1}
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            display="flex"
                            alignItems="center"
                            gap={0.5}
                        >
                            <AccessTime sx={{ fontSize: 16 }} />
                            {title.includes("Real") ? "Última atualização" : "Data"}:&nbsp;
                            {new Date(
                                actualReading?.timestamp
                            ).toLocaleString() ?? "DD/MM/AAA, hh:ss:ms"}{" "}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            display="flex"
                            alignItems="center"
                            gap={0.5}
                        >
                            <Tooltip title="Filtrar sensor">
                                <IconButton
                                    size="small"
                                    onClick={() => setOpenDialog(true)}
                                >
                                    <FilterList fontSize="small" />
                                </IconButton>
                            </Tooltip>

                            <MyLocation sx={{ fontSize: 16 }} />

                            {location
                                ? `${location.pais}, ${location.provincia}, ${location.cidade}`
                                : "--"}
                        </Typography>
                    </Box>

                    {/* ================= CHIPS DE PARÂMETROS ================= */}
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            justifyContent: "flex-end",
                        }}
                    >
                        {Object.keys(parameterOptions).map((key) => {
                            const Icon = parameterOptions[key].icon;
                            return (
                                <Chip
                                    key={key}
                                    label={key}
                                    icon={<Icon />}
                                    onClick={() => onParamChange(key)}
                                    color={
                                        activeParam === key
                                            ? "primary"
                                            : "default"
                                    }
                                    variant={
                                        activeParam === key
                                            ? "filled"
                                            : "outlined"
                                    }
                                    sx={{ fontWeight: "bold" }}
                                />
                            );
                        })}
                    </Box>
                </Box>
            </Box>

            {/* ================= FILTRO DE SENSOR ================= */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>Filtrar Sensor</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <Autocomplete
                            options={sensorCodes}
                            value={sensorCodeValue}
                            onChange={(_, v) => setSensorCodeValue(v)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Sensor"
                                    fullWidth
                                />
                            )}
                        />
                        {args?.fieldDate}
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={() => setOpenDialog(false)}>
                        Cancelar
                    </Button>
                    <Button variant="contained" onClick={handleApplyFilter}>
                        Aplicar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ================= CONTEÚDO ================= */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    pb: 2,
                }}
            >
                {/* ---------- MEDIDOR ---------- */}
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 4,
                        maxWidth: 350,
                        minWidth: 320,
                        mx: "auto",
                    }}
                >
                    <Box sx={{ p: 3, textAlign: "center" }}>
                        <Typography
                            variant="overline"
                            color="text.secondary"
                            fontWeight="bold"
                        >
                            Leitura Instantânea
                        </Typography>

                        <Typography variant="h5" fontWeight="bold" mb={2}>
                            {config.name}
                        </Typography>

                        <MedidorIndividual
                            value={actualReading?.[activeParam] ?? 0}
                            config={config}
                        />

                        <Divider sx={{ my: 2 }} />

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ bgcolor: "grey.50", p: 1 }}
                        >
                            Limites:&nbsp;
                            <b>
                                {config.warning_value}
                                {config.unit}
                            </b>{" "}
                            (Aviso) |{" "}
                            <b>
                                {config.high_value}
                                {config.unit}
                            </b>{" "}
                            (Crítico)
                        </Typography>
                    </Box>
                </Card>

                {/* ---------- GRÁFICO ---------- */}
                <Card
                    elevation={0}
                    sx={{
                        flex: "auto",
                        borderRadius: 4,
                        minWidth: { md: 400 },
                        mx: "auto",
                    }}
                >
                    <Box sx={{ p: 2 }}>
                        <Box
                            sx={{
                                mb: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold">
                                Últimas Leituras
                            </Typography>

                            {Number(actualReading?.[activeParam]) >=
                            config.warning_value ? (
                                <Chip
                                    icon={<WarningAmber />}
                                    label="Nível Elevado"
                                    color="warning"
                                    size="small"
                                    sx={{ fontWeight: "bold" }}
                                />
                            ) : (
                                <Chip
                                    icon={<Verified />}
                                    label="Nível Normal"
                                    color="success"
                                    size="small"
                                    sx={{ fontWeight: "bold" }}
                                />
                            )}
                        </Box>

                        <GraficoTemporal
                            labels={history.labels ?? []}
                            values={history?.[activeParam] ?? []}
                            config={config}
                        />

                        <Box
                            sx={{
                                mt: 1,
                                p: 1.5,
                                bgcolor: "grey.50",
                                borderRadius: 2,
                            }}
                        >
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Exibindo os últimos {maxPoints} pontos.
                            </Typography>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </Box>
    );
}
