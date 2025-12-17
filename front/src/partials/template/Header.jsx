import MenuIcon from "@mui/icons-material/Menu";
import { useAuthProvider } from "../../context/AuthProvider";
import MyButton, { MyLinkButton } from "../../components/MyButton";

export default function Header({ state }) {
    const { open, setOpen } = state;
    const { user } = useAuthProvider();

    return (
        <header className="bg-transparent h-15 flex justify-between pr-4 pt-3 md:hidden">
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
            {!user && (
                <div className="flex-1 flex items-center justify-end">
                    <MyLinkButton to={"/login"} title={"Entrar"} />
                </div>
            )}
        </header>
    );
}
