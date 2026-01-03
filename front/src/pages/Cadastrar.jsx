import { useState } from "react";
import {
    Box,
    Card,
    Typography,
    Button,
    IconButton,
    InputAdornment,
    CircularProgress,
    Fade,
    Stack,
    Divider,
} from "@mui/material";
import {
    PersonOutline,
    MailOutline,
    LockOutlined,
    PhoneOutlined,
    Visibility,
    VisibilityOff,
    ArrowForward,
} from "@mui/icons-material";
import { StyledInput } from "../components/form/MyInput";
import { Link, Navigate } from "react-router-dom";
import { useAlert } from "../hooks/useAlert";
import { useAuth } from "../hooks/useAuth";
import { api } from "../api/axios";
import AppLoader from "../components/feedback/AppLoader";

const STATUS = {
    IDLE: "idle",
    LOADING: "loading",
    SUCCESS: "success",
};

export default function Register() {
    const { user, login } = useAuth();
    const { setAlert } = useAlert();
    const [form, setForm] = useState({
        nome: "",
        email: "",
        telefone: "",
        senha: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState(STATUS.IDLE);

    const isLoading = status === STATUS.LOADING;

    const isFormValid =
        form.nome.length >= 3 &&
        form.email.includes("@") &&
        form.telefone.length >= 9 &&
        form.senha.length >= 4;

    const handleChange = ({ target }) => {
        setForm((prev) => ({
            ...prev,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setStatus(STATUS.LOADING);
            const { data } = await api.post("/user/cadastrar", form);

            if (data?.success) {
                setAlert({
                    type: "SHOW",
                    text: data.message,
                    style: "success",
                });

                const response = await login({
                    email: form.email,
                    senha: form.senha,
                });

                if (response?.success) {
                    setStatus(STATUS.SUCCESS);
                    return setAlert({
                        type: "SHOW",
                        text: response.message,
                        style: "success",
                    });
                }
            }
        } catch (error) {
            console.log(error);

            if (error.code === "ERR_NETWORK") {
                setAlert({
                    type: "SHOW",
                    text: error.message,
                    style: "error",
                });
            } else {
                setAlert({
                    type: "SHOW",
                    text: error.response?.data?.message,
                    style: "warning",
                });
            }

            setStatus(STATUS.IDLE);
        }
    };

    if (user || status === STATUS.SUCCESS) {
        return <Navigate to={"/"} />;
    }

    return (
        <Box
            sx={{
                minHeight: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
            }}
        >
            <Fade in timeout={600}>
                <Card
                    sx={{
                        width: "100%",
                        maxWidth: 460,
                        borderRadius: "24px",
                        boxShadow: "0 20px 40px rgba(0,0,0,.1)",
                    }}
                >
                    {/* Header */}
                    <Box sx={{ p: 4, textAlign: "center" }}>
                        <Box
                            sx={{
                                width: 56,
                                height: 56,
                                borderRadius: "16px",
                                bgcolor: "primary.main",
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mx: "auto",
                                mb: 1,
                            }}
                        >
                            <PersonOutline />
                        </Box>

                        <Typography variant="h4" fontWeight={700}>
                            Criar conta
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Preencha os dados para se cadastrar
                        </Typography>
                    </Box>

                    {/* Form */}
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ px: 4, pb: 3 }}
                    >
                        <Stack spacing={2}>
                            <StyledInput
                                label="Nome completo"
                                name="nome"
                                value={form.nome}
                                onChange={handleChange}
                                icon={<PersonOutline fontSize="small" />}
                                required
                            />

                            <StyledInput
                                label="E-mail"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                icon={<MailOutline fontSize="small" />}
                                required
                            />

                            <StyledInput
                                label="Telefone"
                                name="telefone"
                                type="tel"
                                value={form.telefone}
                                onChange={handleChange}
                                icon={<PhoneOutlined fontSize="small" />}
                                required
                            />

                            <StyledInput
                                label="Senha"
                                name="senha"
                                type={showPassword ? "text" : "password"}
                                value={form.senha}
                                onChange={handleChange}
                                icon={<LockOutlined fontSize="small" />}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Alternar visibilidade da senha"
                                                onClick={() =>
                                                    setShowPassword((v) => !v)
                                                }
                                                edge="end"
                                                size="small"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                type="submit"
                                size="large"
                                variant="contained"
                                disabled={!isFormValid || isLoading}
                                endIcon={!isLoading && <ArrowForward />}
                                sx={{
                                    borderRadius: "12px",
                                    py: 1.4,
                                    textTransform: "none",
                                }}
                            >
                                {isLoading ? (
                                    <>
                                        Criando sua conta...
                                        <AppLoader type={"small"} />
                                    </>
                                ) : (
                                    "Criar conta"
                                )}
                            </Button>
                        </Stack>

                        <Box sx={{ my: 2 }}>
                            <Divider />
                        </Box>

                        <Typography align="center" variant="body2">
                            Já tem uma conta?{" "}
                            <Typography
                                component="span"
                                color="primary"
                                fontWeight={600}
                            >
                                <Link to={"/login"}>Entrar</Link>
                            </Typography>
                        </Typography>
                    </Box>
                </Card>
            </Fade>
        </Box>
    );
}
