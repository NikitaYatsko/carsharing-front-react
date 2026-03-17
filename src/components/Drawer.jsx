import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';
// Иконки для меню
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GavelIcon from '@mui/icons-material/Gavel';
import { Link } from "react-router-dom";
export default function TemporaryDrawer({user}) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    // Пункты меню
    const menuItems = [
        { text: "Список пользователей", icon: <PeopleIcon />, path: "/users" },
        { text: "Список Аренд", icon: <ListAltIcon />, path: "/bookings" },
        { text: "Мои Аренды", icon: <AssignmentIcon />, path: "/bookings" },
        { text: "Заявки ВУ", icon: <GavelIcon />, path: "/cars" },
    ];

    const DrawerList = (
        <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer(false)}>

            <Box sx={{p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Avatar
                    src={user?.avatar || '/static/images/avatar/2.jpg'}
                    alt={user?.name || 'User'}
                    sx={{width: 64, height: 64, mb: 1}}
                />
                <Typography variant="subtitle1" fontWeight={600}>
                    {user?.name || 'Имя пользователя'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {user?.role || 'Роль'}
                </Typography>
            </Box>
            <Divider/>

            <List>
                {menuItems.map((item, index) => (
                    <React.Fragment key={item.text}>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={item.path}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                        {index < menuItems.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <MenuIcon sx={{cursor: "pointer"}} onClick={toggleDrawer(true)}>Open drawer</MenuIcon>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}