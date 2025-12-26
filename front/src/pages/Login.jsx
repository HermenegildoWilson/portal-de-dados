import * as React from "react";
import { Link, Navigate } from "react-router-dom";

import AppLoader from "../components/feedback/AppLoader";
import MyCard from "../components/MyCard";
import MyForm from "../components/form/MyForm";
import MyFormButton from "../components/form/MyFormButton";
import MyInput from "../components/form/MyInput";

import { Divider } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useAlert } from "../hooks/useAlert";

export default function Login() {
    const [formData, setFormData] = React.useState({
        email: "",
        senha: "",
    });
    const [formState, setFormState] = React.useState("typing");

    const { setAlert } = useAlert();

    const { login, user } = useAuth();

    const formEmpty = !formData.email || !formData.senha;
    const titleButton =
        formState === "loading" ? (
            <>
                Entrando... <AppLoader sx={"ml-3"} type={"small"} />
            </>
        ) : (
            "Entrar"
        );

    const handleChangeInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setFormState("loading");
            const response = await login(formData);

            if (response.success) {
                setFormState("done");
                return setAlert({
                    type: "SHOW",
                    text: response.message,
                    style: "success",
                });
            }
        } catch (error) {
            setFormState("typing");
            setAlert({ type: "SHOW", text: error.response.data.message, style: "error" });
        }
    };

    if (user) {
        return <Navigate replace to="/" />;
    }

    return (
        <div className="flex h-110 md:h-160 items-center justify-center">
            <MyCard sx="w-80 md:w-100">
                <h1 className="text-3xl mb-8 text-(--color-blue-claro)">
                    Entrar na plataforma
                </h1>
                <MyForm
                    handleSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
                    <MyInput
                        id="email"
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        handleChangeInput={(e) => {
                            handleChangeInput(e);
                        }}
                    />
                    <MyInput
                        id="senha"
                        label="Senha"
                        type="password"
                        name="senha"
                        value={formData.senha}
                        handleChangeInput={(e) => {
                            handleChangeInput(e);
                        }}
                    />
                    <MyFormButton
                        titleButton={titleButton}
                        disabled={formEmpty}
                    />
                    <Link
                        to={"/redefinirsenha"}
                        className="text-blue-500 text-center mb-2 mt-2"
                    >
                        Esqueceu a senha?
                    </Link>
                    <Divider />
                    <div className="text-center mt-5">
                        <Link
                            to={"/cadastrar"}
                            className={`bg-(--color-green) text-white p-3 rounded-md`}
                        >
                            Criar Conta
                        </Link>
                    </div>
                </MyForm>
            </MyCard>
        </div>
    );
}
