import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default function Header({title}) {
    const classes = {
        root: {
            flexGrow: 1,
        },
        header: {
            backgroundColor: "white"
        },
        menuButton: {
            marginRight: 2
        },
        title: {
            flexGrow: 1,
        },
        list: {
            width: 250,
            backgroundColor: "black",
            color: "white",
            height: "100%"
        },
    };
    const [state, setState] = React.useState({
        drawerClosed: true,
    });

    const drawerItems = [
        {
            id: 1, title: "Cím", items: [
                "Vác, Sziréna köz 8",
            ]
        },
        {
            id: 2, title: "Elérhetőség", items: [
                "(06) 30 123 4567",
                "szunyog@email.com",
            ]
        },
        {
            id: 3, title: "Nyitva tartás", items: [
                "Hétfő 16:00 - 01:00",
                "Kedd 16:00 - 01:00",
                "Szerda 16:00 - 01:00",
                "Csütörtök 16:00 - 01:00",
                "Péntek 16:00 - 04:00",
                "Szombat 16:00 - 04:00",
            ]
        },
    ]

    const menus = [
        {
            title: "Kezdőlap",
            url: "/"
        },
        {
            title: "Itallap",
            url: "/drinklist"
        },
        {
            title: "Zenegép",
            url: "/music"
        }
    ]

    let active = 1;
    switch(title){
        case "Kezdőlap":
            active = 0;
            break;
        case "Rólunk":
            active = 1;
            break;
        case "zenegép":
            active = 2;
            break;
    }
    const toggleDrawer = (open) => {
        setState({ drawerClosed: open });
    };

    const navigate = (destination) => {
        window.location = destination;
    }

    return (
        <div style={classes.root}>
            <AppBar position="relative" style={classes.header}>
                <Drawer anchor={"right"} open={!state.drawerClosed} onClose={() => toggleDrawer(true)}>
                    <div style={classes.list}>
                        <List>
                            {drawerItems.map((item, index) => {
                                return (
                                    <React.Fragment key={item.id}>
                                        <ListItem button>
                                            <ListItemText primary={item.title} />
                                        </ListItem>
                                        <Divider style={{ backgroundColor: "rgb(255 255 255 / 12%)" }} />
                                        {item.items.map((x => {
                                            return (
                                                <ListItem key={x}>
                                                    <ListItemText primary={x} />
                                                </ListItem>
                                            )
                                        }))}
                                    </React.Fragment>
                                )
                            })}
                        </List>
                    </div>
                </Drawer>
                <Toolbar style={{ justifyContent: "space-between" }}>
                    <Tabs value={active}>
                        {menus.map((menu, i) => {
                            return (
                                <Tab key={i} value={i} label={menu.title} onClick={() => navigate(menu.url)} />
                            )
                        })}
                    </Tabs>
                    <IconButton edge="end" style={classes.menuButton} color="inherit" aria-label="menu" onClick={() => toggleDrawer(false)}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}