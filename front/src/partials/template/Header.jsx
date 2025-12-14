import MenuIcon from "@mui/icons-material/Menu";
import { useAuthProvider } from "../../context/AuthProvider";
import MyButton from "../../components/MyButton";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header({ state }) {
    const { open, setOpen } = state;
    const { user } = useAuthProvider();

    return (
        <header className="bg-transparent h-15 flex justify-between items-center pr-4">
            <div className="md:hidden">
                <MyButton
                    type="text"
                    title={<MenuIcon sx={{ fontSize: 30 }} />}
                    handleClick={() => {
                        setOpen(!open);
                    }}
                />
            </div>
            <div className="flex-1 text-right">
                {!user ? (
                    <Link
                        to={"/login"}
                        className="bg-blue-500 text-white p-2.5 rounded-md"
                    >
                        Entrar
                    </Link>
                ) : (
                    <TextField />
                )}
            </div>
        </header>
    );
}
