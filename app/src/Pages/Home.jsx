import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Container,
    Button,
    Grid,
    Paper,
    Stack,
    useTheme,
    Avatar,
    Divider,
    Chip,
} from "@mui/material";
import {
    ArrowForward,
    CloudQueue,
    Timeline,
    Security,
    Devices,
    Agriculture,
    Business,
    MedicalServices,
    School,
} from "@mui/icons-material";
import { motion } from "framer-motion";

// Componente para Wrapper de Animação
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

/**
 * Landing Page Premium para o Sistema de Monitoramento Ambiental.
 * Design focado em conversão, animações fluidas e impacto social.
 */
export default function LandingPage() {
    const theme = useTheme();
    const navigate = useNavigate();
    const seccao_impacto_socialRef = useRef(null); // Ref para a seção de destino

    const rolarParaSecao = (seccao) => {
        if (seccao.current) {
            seccao.current.scrollIntoView({ behavior: "smooth" }); // Rola suavemente
        }
    };

    const features = [
        {
            icon: <Timeline fontSize="large" />,
            title: "Precisão em Tempo Real",
            desc: "Sensores calibrados para entregar métricas com fidelidade laboratorial a cada segundo.",
        },
        {
            icon: <CloudQueue fontSize="large" />,
            title: "Ecossistema Cloud",
            desc: "Seus dados armazenados com segurança e acessíveis de qualquer lugar do planeta.",
        },
        {
            icon: <Devices fontSize="large" />,
            title: "Dashboards Responsivos",
            desc: "Uma experiência fluida e intuitiva tanto no desktop quanto no seu smartphone.",
        },
        {
            icon: <Security fontSize="large" />,
            title: "Inteligência Preditiva",
            desc: "Alertas inteligentes que antecipam condições críticas antes que se tornem problemas.",
        },
    ];

    const socialImpacts = [
        {
            icon: <Agriculture />,
            title: "Agronegócio",
            desc: "Otimize colheitas monitorando microclimas e humidade do solo com precisão cirúrgica.",
        },
        {
            icon: <MedicalServices />,
            title: "Saúde Pública",
            desc: "Controle a qualidade do ar em hospitais e centros urbanos para prevenir doenças respiratórias.",
        },
        {
            icon: <Business />,
            title: "Indústria 4.0",
            desc: "Garanta a conformidade ambiental e a segurança operacional em plantas industriais complexas.",
        },
        {
            icon: <School />,
            title: "Educação e Pesquisa",
            desc: "Dados reais para o desenvolvimento científico e conscientização ambiental em escolas.",
        },
    ];

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                
                flex: "1",
            }}
        >
            {/* HERO SECTION COM ANIMAÇÃO */}
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.light}22 0%, ${theme.palette.background.default} 100%)`,
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={8} alignItems="center">
                        <Grid item xs={12} md={7}>
                            <MotionBox
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                sx={{ mb: -4 }}
                            >
                                <Typography
                                    variant="overline"
                                    sx={{
                                        color: "primary.main",
                                        fontWeight: 800,
                                        letterSpacing: 3,
                                        mt: 1,
                                        mb: 2,
                                        display: "block",
                                    }}
                                >
                                    TECNOLOGIA IOT DE PONTA
                                </Typography>
                                <Typography
                                    variant="h1"
                                    gutterBottom
                                    sx={{
                                        fontWeight: 900,
                                        fontSize: {
                                            xs: "2.4rem",
                                            md: "3.5rem",
                                        },
                                        letterSpacing: "-0.04em",
                                        lineHeight: 1.1,
                                        color: "text.primary",
                                        mb: 2,
                                    }}
                                >
                                    Decisões inteligentes guiadas por{" "}
                                    <span
                                        style={{
                                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        dados reais.
                                    </span>
                                </Typography>
                                <Typography
                                    variant="h6"
                                    color="text.secondary"
                                    sx={{
                                        mb: 2,
                                        fontWeight: 400,
                                        lineHeight: 1.8,
                                        fontSize: "1.2rem",
                                    }}
                                >
                                    Transforme variáveis ambientais em ativos
                                    estratégicos. Monitore, analise e proteja o
                                    que importa com a plataforma mais elegante
                                    do mercado.
                                </Typography>
                                <Stack
                                    direction={{ xs: "column", sm: "row" }}
                                    spacing={3}
                                >
                                    <Button
                                        type="contained"
                                        onClick={() => navigate("/cadastrar")}
                                        endIcon={<ArrowForward />}
                                        sx={{
                                            borderRadius: 2,
                                            fontSize: "1.1rem",
                                            boxShadow:
                                                "0 10px 20px rgba(26, 115, 232, 0.3)",
                                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                            color: "background.paper",
                                        }}
                                    >
                                        Explorar Dashboard
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            rolarParaSecao(
                                                seccao_impacto_socialRef,
                                            );
                                        }}
                                        variant="outlined"
                                        sx={{
                                            borderRadius: 2,
                                            fontSize: "1.1rem",
                                            borderWidth: 2,
                                            "&:hover": { borderWidth: 2 },
                                            textTransform: "none",
                                        }}
                                    >
                                        Nossas Soluções
                                    </Button>
                                </Stack>
                            </MotionBox>
                        </Grid>

                        <Grid item xs={12} md={5} sx={{ margin: "auto" }}>
                            <MotionBox
                                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 1, delay: 0.2 }}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 1,
                                        borderRadius: 12,
                                        background: "rgba(255, 255, 255, 0.6)",
                                        backdropFilter: "blur(20px)",
                                        border: "1px solid rgba(255, 255, 255, 0.3)",
                                        boxShadow:
                                            "0 40px 80px rgba(0,0,0,0.1)",
                                        position: "relative",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            bgcolor: "white",
                                            borderRadius: 11,
                                            p: { xs: 2.5, md: 6 },
                                            textAlign: "center",
                                            background:
                                                "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
                                        }}
                                    >
                                        <MotionBox
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        >
                                            <Typography
                                                variant="h2"
                                                fontWeight="900"
                                                color="primary"
                                                sx={{ fontSize: "6rem" }}
                                            >
                                                24.5°
                                            </Typography>
                                            <Typography
                                                variant="h5"
                                                fontWeight="600"
                                                color="text.secondary"
                                            >
                                                Uíge, Angola
                                            </Typography>
                                            <Chip
                                                label="Ar: Excelente"
                                                color="success"
                                                sx={{
                                                    mt: 2,
                                                    fontWeight: 700,
                                                    px: 2,
                                                }}
                                            />
                                        </MotionBox>
                                    </Box>
                                </Paper>
                            </MotionBox>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* IMPACTO SOCIAL E SETORIAL */}
            <Container
                maxWidth="lg"
                sx={{ py: 8 }}
                ref={seccao_impacto_socialRef}
            >
                <Box sx={{ textAlign: "center", mb: 5 }}>
                    <Typography variant="h4" fontWeight="800" gutterBottom>
                        Um sistema, infinitas possibilidades.
                    </Typography>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ maxWidth: 700, mx: "auto" }}
                    >
                        Não coletamos apenas números. Coletamos a base para uma
                        sociedade mais sustentável e produtiva.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {socialImpacts.map((impact, idx) => (
                        <Grid item xs={12} sm={6} key={idx}>
                            <MotionPaper
                                whileHover={{ y: -10 }}
                                sx={{
                                    p: { xs: 2, md: 4 },
                                    borderRadius: 6,
                                    borderColor: "divider",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 3,
                                    height: "100%",
                                    width: "100%",
                                }}
                            >
                                <Avatar
                                    sx={{
                                        bgcolor: "primary.light",
                                        color: "background.paper",
                                        width: 60,
                                        height: 60,
                                    }}
                                >
                                    {impact.icon}
                                </Avatar>
                                <Box>
                                    <Typography
                                        variant="h6"
                                        fontWeight="800"
                                        gutterBottom
                                    >
                                        {impact.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                    >
                                        {impact.desc}
                                    </Typography>
                                </Box>
                            </MotionPaper>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* FUNCIONALIDADES COM ANIMAÇÃO STAGGER */}
            <Box sx={{ py: 8, bgcolor: "#0F172A", color: "white" }}>
                <Container maxWidth="lg">
                    <Grid container spacing={8}>
                        {features.map((f, i) => (
                            <Grid item xs={12} sm={6} md={3} key={i}>
                                <MotionBox
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Box sx={{ color: "primary.main", mb: 2 }}>
                                        {f.icon}
                                    </Box>
                                    <Typography
                                        variant="h6"
                                        fontWeight="800"
                                        sx={{ mb: 1 }}
                                    >
                                        {f.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "rgba(255,255,255,0.6)",
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        {f.desc}
                                    </Typography>
                                </MotionBox>
                            </Grid>
                        ))}
                    </Grid>

                    <Divider
                        sx={{ my: 8, borderColor: "rgba(255,255,255,0.1)" }}
                    />

                    <Box sx={{ textAlign: "center" }}>
                        <Typography
                            variant="h4"
                            fontWeight="800"
                            sx={{ mb: 4 }}
                        >
                            Pronto para transformar sua gestão ambiental?
                        </Typography>
                        <Button
                            onClick={() => navigate("/cadastrar")}
                            type="contained"
                            sx={{
                                width: "250px",
                                py: 1,
                                borderRadius: 2,
                                fontWeight: 800,
                                fontSize: "1.1rem",
                            }}
                        >
                            Começar Gratuitamente
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* RODAPÉ */}
            <Box
                sx={{
                    py: 8,
                    textAlign: "center",
                    bgcolor: "background.default",
                }}
            >
                <Stack
                    direction="row"
                    spacing={3}
                    justifyContent="center"
                    sx={{ mb: 4 }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            cursor: "pointer",
                            "&:hover": { color: "primary.main" },
                        }}
                    >
                        Privacidade
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            cursor: "pointer",
                            "&:hover": { color: "primary.main" },
                        }}
                    >
                        Termos
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            cursor: "pointer",
                            "&:hover": { color: "primary.main" },
                        }}
                    >
                        Suporte
                    </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} HyperCrest. Tecnologia para um
                    futuro consciente.
                </Typography>
            </Box>
        </Box>
    );
}
