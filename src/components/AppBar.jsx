import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ThemeToggle from "./ThemeToggler.jsx";
import TemporaryDrawer from "./Drawer.jsx";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar({mode, setMode}) {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="h6" component="div"
                                sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <TemporaryDrawer/>
                        CarSharing

                    </Typography>
                    <ThemeToggle mode={mode} setMode={setMode}/>

                    <Menu
                        anchorEl={anchorElUser}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        anchorOrigin={{vertical: "top", horizontal: "right"}}
                        transformOrigin={{vertical: "top", horizontal: "right"}}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                {setting}
                            </MenuItem>
                        ))}
                    </Menu>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;