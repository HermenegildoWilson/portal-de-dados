import * as React from "react";
import MyButton, { MyLinkButton } from "../components/MyButton";
import { MyAlertContext } from "../App";
import { useAuthProvider } from "../context/AuthProvider";
import { Link, Navigate, useParams } from "react-router-dom";
import MyLoader from "../components/MyLoader";
import MyCard from "../components/MyCard";
import MyForm, { MyInput } from "../components/MyFormComponents";
import { Divider } from "@mui/material";

export default function Login() {
    const [formData, setFormData] = React.useState({
        email: "",
        senha: "",
    });
    const [formState, setFormState] = React.useState("typing");

    const { setOpenAlert } = React.useContext(MyAlertContext).state;

    const { login, user } = useAuthProvider();

    const formEmpty = !formData.email || !formData.senha;
    const titleButton =
        formState === "loading" ? (
            <>
                Entrando... <MyLoader sx={"ml-3"} type={"small"} />
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

    const handleSubmit = async () => {
        setFormState("loading");
        const response = await login(formData);

        if (response.success) {
            setFormState("done");
            return setOpenAlert({
                type: "SHOW",
                text: response.message,
                style: "success",
            });
        }
        setFormState("typing");
        setOpenAlert({ type: "SHOW", text: response.message, style: "error" });
    };

    if (user) {
        return <Navigate replace to="/" />;
    }

    return (
        <div className="flex h-110 items-center justify-center">
            <MyCard sx="w-80 md:w-100">
                <h1 className="text-3xl mb-8 text-(--color-blue-claro)">
                    Entrar na plataforma
                </h1>
                <MyForm>
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
                    <MyButton
                        title={titleButton}
                        disabled={formEmpty}
                        handleClick={handleSubmit}
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
