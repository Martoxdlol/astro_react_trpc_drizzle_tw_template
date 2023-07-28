import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import { Helmet } from "react-helmet";

export default function Appbar(props: { title: string, action?: React.ReactNode }) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Helmet>
                <title>{props.title}</title>
            </Helmet>
            <Box sx={{ flexGrow: 1 }}>
                <Drawer
                    open={open}
                    onClose={() => setOpen(false)}

                >
                    <Box sx={{ width: 250 }}>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Home" />
                                </ListItemButton>
                            </ListItem>

                        </List>
                    </Box>
                </Drawer>
                <AppBar position="static" elevation={0}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                            onClick={() => setOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, textTransform: 'uppercase' }}
                        >
                            {props.title}
                        </Typography>
                        {props.action}
                    </Toolbar>
                </AppBar>
            </Box></>
    );
}