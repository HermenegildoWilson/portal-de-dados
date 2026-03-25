import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    background: { default: "#f4f6f8", paper: "#FFFFFF" },
  },
  typography: {
    fontFamily: "Lato, Arial, sans-serif",
  },
  components: {},
});

export default theme;
