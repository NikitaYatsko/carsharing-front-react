import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CarRentalIcon from '@mui/icons-material/CarRental';
import {Link, useNavigate} from "react-router-dom";
import {useUser} from '../contexts/UserContext';


export default function TemporaryDrawer() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const {user} = useUser();

    const navigate = useNavigate();


    const menuItems = [
        {text: "Список пользователей", icon: <PeopleIcon/>, path: "/users"},
        {text: "Список Аренд", icon: <ListAltIcon/>, path: "/bookings"},
        {text: "Мои Аренды", icon: <AssignmentIcon/>, path: "/bookings/my"},
        {text: "Список Машин", icon: <CarRentalIcon/>, path: "/cars"},

    ];

    function toProfile() {
        navigate("/profile/me");
    }

    const DrawerList = (
        <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer(false)}>

            <Box sx={{p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Avatar onClick={() => toProfile()}
                        src={user?.photoUrl || '/static/images/avatar/2.jpg'}
                        alt={user?.firstName || 'User'}
                        sx={{width: 64, height: 64, mb: 1,cursor: 'pointer'}}
                />
                <Typography variant="subtitle1" fontWeight={600}>
                    {user?.firstName || 'Имя пользователя'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {user?.username || 'Роль'}
                </Typography>
            </Box>
            <Divider/>

            <List>
                {menuItems.map((item, index) => (
                    <React.Fragment key={item.text}>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={item.path}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text}/>
                            </ListItemButton>
                        </ListItem>
                        {index < menuItems.length - 1 && <Divider/>}
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