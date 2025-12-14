import Drawer from "@mui/material/Drawer";
import OpcoesMenu from "./OpcoesMenu";

export default function NavBar({state}) {    
    const {open, setOpen} = state;

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <>
            <Drawer open={open} onClose={toggleDrawer(false) }>
                <OpcoesMenu toggleDrawer={toggleDrawer} />
            </Drawer>
            <div className="hidden md:block" >
                <OpcoesMenu toggleDrawer={toggleDrawer} />
            </div>
        </>
    );
}
