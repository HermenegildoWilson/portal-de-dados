import { Alert, Drawer, Typography } from "@mui/material";
import {
    MyList,
    MyListItem,
    MyListItemButton,
    MyListItemIcon,
    MyListItemText,
} from "../components/MyListComponents";
import { iconMapper } from "../utils/iconMapper";
import { useEffect, useState } from "react";
import MyInput from "../components//form/MyInput";
import MyForm from "../components//form/MyForm";
import { useAuth } from "../hooks/useAuth";
import PageHeader from "../components/typography/PageHeader";

export default function Perfil() {
    const { user } = useAuth();

    const [formOptions, setFormOptions] = useState({
        show: false,
        data: "",
    });

    const dataOptions = [
        { value: user.email, icon: "email", label: "Email" },
        { value: user.nome, icon: "perfil", label: "Nome" },
        { value: "*  *  *  *  *  *  *  *", icon: "password", label: "Senha" },
    ];
    return (
        <>
            <PageHeader>
                <Typography variant={"h6"}>Perfil</Typography>
            </PageHeader>

            <div className="rounded-full w-30 h-30 flex justify-center items-center text-7xl bg-(--color-blue-claro) text-(--color-branco-suave) m-auto mb-10 mt-4">
                {user.nome[0]}
            </div>
            <MyList sx={{ padding: "10px", maxWidth: 400, margin: "auto" }}>
                {dataOptions.map((opt) => (
                    <MyListItem
                        key={opt.email}
                        handleClick={() => {
                            setFormOptions({
                                show: true,
                                label: opt.label,
                            });
                        }}
                    >
                        <MyListItemButton sx={{ borderRadius: 2 }}>
                            <MyListItemIcon
                                Icon={iconMapper[opt.icon]}
                            ></MyListItemIcon>
                            <div className="-ml-4">
                                <p>{opt.label}</p>
                                <MyListItemText
                                    sx={{ margin: 0 }}
                                    text={opt.value}
                                />
                            </div>
                        </MyListItemButton>
                    </MyListItem>
                ))}
            </MyList>

            <FormEdit state={{ formOptions, setFormOptions }} />
        </>
    );
}

function FormEdit({ state }) {
    const { formOptions, setFormOptions } = state;
    const toggleDrawer = (newOpen) => () => {
        setFormOptions({
            ...formOptions,
            show: newOpen,
        });
    };

    //error  success
    const [openAlert, setOpenAlert] = useState({
        show: false,
        text: "",
        type: "",
    });

    const getInitialValues = () => {
        if (formOptions.label !== "Senha") {
            return { value: "" };
        } else {
            return {
                senhaactual: "",
                novasenha: "",
                confirmacaosenha: "",
            };
        }
    };

    const [formEdit, setFormEdit] = useState(getInitialValues());

    useEffect(() => {
        setFormEdit(getInitialValues());
    }, [formOptions.label]);

    return (
        <Drawer
            open={formOptions.show}
            onClose={toggleDrawer(false)}
            anchor="bottom"
        >
            <div className="p-4 pt-6 h-100">
                <MyForm
                    handleSubmit={(e) => {
                        e.preventDefault();
                        setOpenAlert({
                            show: true,
                            text: "Funcionalidade em construção!",
                            type: "warning",
                        });
                    }}
                >
                    <h1 className="text-xl mb-3 text-(--color-blue-claro)">
                        Editar {formOptions.label}
                    </h1>
                    {openAlert.show && (
                        <Alert severity={openAlert.type} sx={{ mb: 2 }}>
                            {openAlert.text}
                        </Alert>
                    )}
                    {formOptions.label !== "Senha" ? (
                        <MyInput
                            id={formOptions.label}
                            label={`Novo ${formOptions.label}`}
                            type={
                                formOptions.label === "Email" ? "email" : "text"
                            }
                            key={formOptions.label}
                            name={formOptions.label}
                            value={formEdit.value}
                            handleChangeInput={(e) => {
                                setFormEdit({
                                    ...formEdit,
                                    value: e.target.value,
                                });
                            }}
                        />
                    ) : (
                        <>
                            <MyInput
                                id="senhaactual"
                                label={`Senha Actual`}
                                type={"text"}
                                name={"senhaactual"}
                                value={formEdit.senhaactual}
                                handleChangeInput={(e) => {
                                    setFormEdit({
                                        ...formEdit,
                                        senhaactual: e.target.value,
                                    });
                                }}
                            />

                            <MyInput
                                id="novasenha"
                                label={`Nova Senha`}
                                type={"text"}
                                name={"novasenha"}
                                value={formEdit.novasenha}
                                handleChangeInput={(e) => {
                                    setFormEdit({
                                        ...formEdit,
                                        novasenha: e.target.value,
                                    });
                                }}
                            />

                            <MyInput
                                id="confirmacaosenha"
                                label={`Confirmar Senha`}
                                type={"text"}
                                name={"confirmacaosenha"}
                                value={formEdit.confirmacaosenha}
                                handleChangeInput={(e) => {
                                    setFormEdit({
                                        ...formEdit,
                                        confirmacaosenha: e.target.value,
                                    });
                                }}
                            />
                        </>
                    )}
                    <button
                        className={`bg-(--color-blue-claro) cursor-pointer text-white p-2 rounded-md flex justify-center items-center`}
                        //disabled={formEmpty}
                    >
                        Salvar
                    </button>
                </MyForm>
            </div>
        </Drawer>
    );
}
