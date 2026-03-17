import {createTheme} from "@mui/material/styles";

// Светлая тема
export const lightTheme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: "#E5E5E5",
            paper: "#FFFFFF",
        },
        primary: {
            main: "#0088CC",
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: "#33B5E5",
            contrastText: "#FFFFFF",
        },
        text: {
            primary: "#1C1C1C",
            secondary: "#4F4F4F",
        },
    },
    typography: {
        fontFamily: "'Segoe UI', Roboto, sans-serif",
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: 8,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                },
            },
        },

    },
});

// Тёмная тема
export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#1E1E1E",
            paper: "#2C2C2C",
        },
        primary: {
            main: "#0088CC",
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: "#33B5E5",
            contrastText: "#FFFFFF",
        },
        text: {
            primary: "#FFFFFF",
            secondary: "#BBBBBB",
        },
    },
    typography: {
        fontFamily: "'Segoe UI', Roboto, sans-serif",
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: 8,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                },
            },
        },

    },
});