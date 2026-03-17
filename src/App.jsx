import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import ResponsiveAppBar from "./components/AppBar.jsx";
import TemporaryDrawer from "./components/Drawer.jsx";
import { lightTheme, darkTheme } from "./theme/theme.js";

// Страницы
import BookingsPage from "./pages/BookingsPage.jsx";
import CarsPage from "./pages/CarsPage.jsx";
import PersonalProfilePage from "./pages/PersonalProfilePage.jsx";
import UsersPage from "./pages/UsersPage.jsx";

function App() {
    const [mode, setMode] = React.useState("light");

    const theme = React.useMemo(
        () => (mode === "light" ? lightTheme : darkTheme),
        [mode]
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Сбрасывает базовые стили для MUI */}
            <Router>
                {/* Верхняя панель с переключателем темы */}
                <ResponsiveAppBar mode={mode} setMode={setMode} />



                {/* Основное содержимое */}

                    <Routes>
                        <Route path="/" element={<BookingsPage />} />
                        <Route path="/bookings" element={<BookingsPage />} />
                        <Route path="/cars" element={<CarsPage />} />
                        <Route path="/profile" element={<PersonalProfilePage />} />
                        <Route path="/users" element={<UsersPage />} />
                    </Routes>

            </Router>
        </ThemeProvider>
    );
}

export default App;