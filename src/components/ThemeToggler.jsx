import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Tooltip from '@mui/material/Tooltip';

export default function ThemeToggle({mode, setMode}) {
    const toggleTheme = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };

    return (
        <Tooltip title="Переключить тему">
            <IconButton onClick={toggleTheme} color="inherit">
                {mode === 'light' ? <Brightness4Icon/> : <Brightness7Icon/>}
            </IconButton>
        </Tooltip>
    );
}