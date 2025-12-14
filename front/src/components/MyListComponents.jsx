import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export function MyList({ children }) {
    return <List>{children}</List>;
}

export function MyListItem({ children, sx, handleClick  }) {
    return <ListItem onClick={handleClick} sx={{ padding: "0", marginBottom: "6px", ...sx }}>{children}</ListItem>;
}

export function MyListItemButton({ children }) {
    return <ListItemButton>{children}</ListItemButton>;
} //disablePadding

export function MyListItemText({ text }) {
    return <ListItemText className="text-gray-700" primary={text} />;
}

export function MyListItemIcon({ Icon }) {
    return (
        <ListItemIcon>
            <Icon size={20} className="text-blue-500" />
        </ListItemIcon>
    );
}

//<Divider />
