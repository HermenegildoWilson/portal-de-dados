import * as React from "react";
import { MyAlertContext } from "../App";
import { useAuthProvider } from "../context/AuthProvider";
import { Link, Navigate } from "react-router-dom";
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

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                    <button
                        className={`bg-(--color-blue-claro) cursor-pointer text-white p-2 rounded-md flex justify-center items-center`}
                        disabled={formEmpty}
                    >
                        {titleButton}
                    </button>
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
