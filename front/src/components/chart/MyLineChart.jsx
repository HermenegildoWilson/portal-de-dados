import { LineChart } from "@mui/x-charts/LineChart";
import { Card, CardContent, Typography } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

export default function MyLineChart({ chartsData, points = 10 }) {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    const MAX_POINTS = points;
    const displayedData = chartsData.slice(-MAX_POINTS);
    return (
        <Card elevation={3}>
            <CardContent>
                <Typography
                    variant="h6"
                    sx={{ textAlign: "center" }}
                    gutterBottom
                >
                    Gráfico 
                </Typography>

                <LineChart
                    key={displayedData.length}
                    height={280}
                    xAxis={[
                        {
                            scaleType: "point",
                            data: displayedData.map((item) =>
                                new Date(item.timestamp).toLocaleTimeString()
                            ),
                            label: "Tempo",
                        },
                    ]}
                    series={[
                        {
                            data: displayedData.map((item) => item.Temperatura),
                            label: "Temperatura (°C)",
                        },
                        {
                            data: displayedData.map((item) => item.Humidade),
                            label: "Humidade (%)",
                        },
                        {
                            data: displayedData.map(
                                (item) => item["Pressao do Ar"]
                            ),
                            label: "Pressão do Ar (hPa)",
                        },
                        {
                            data: displayedData.map(
                                (item) => item["Qualidade do Ar"]
                            ),
                            label: "Qualidade do Ar (%)",
                        },
                    ]}
                    grid={{ vertical: true, horizontal: true }}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                />
            </CardContent>
        </Card>
    );
}
