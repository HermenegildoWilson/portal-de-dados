import MenuIcon from "@mui/icons-material/Menu";
import { useAuthProvider } from "../../context/AuthProvider";
import MyButton, { MyLinkButton } from "../../components/MyButton";

export default function Header({ state }) {
    const { open, setOpen } = state;
    const { user } = useAuthProvider();

    return (
        <header className="bg-transparent h-20 flex justify-between pr-4 pt-3">
            <div className="md:hidden">
                <MyButton
                    type="text"
                    sx={{ backgroundColor: "transparent" }}
                    title={<MenuIcon sx={{ fontSize: 30 }} />}
                    handleClick={() => {
                        setOpen(!open);
                    }}
                />
            </div>
            <div className="flex-1 text-right">
                {!user && <MyLinkButton to={"/login"} title={"Entrar"} />}
            </div>
        </header>
    );
}
