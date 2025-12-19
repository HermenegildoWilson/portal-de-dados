import MenuIcon from "@mui/icons-material/Menu";
import MyButton from "../../components/form/MyButton";
import MyLinkButton from "../../components/form/MyLinkButton";
import { useAuth } from "../../hooks/useAuth";

export default function Header({ state }) {
    const { open, setOpen } = state;
    const { user } = useAuth();

    return (
        <header className="bg-transparent h-13 flex justify-between pr-4 pt-1 md:hidden">
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
