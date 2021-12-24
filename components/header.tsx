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
import { HeaderProperties } from '../types/dataTypes';

export default function Header({title, drawerItems, menus}:HeaderProperties) {
    const classes = {
        root: {
            flexGrow: 1,
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

    let active = 1;
    switch(title){
        case "Kezdőlap":
            active = 0;
            break;
        case "Itallap":
            active = 1;
            break;
        case "Hírek":
            active = 2;
            break;
        case "Galléria":
            active = 3;
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
            <AppBar position="fixed">
                <Drawer anchor={"right"} open={!state.drawerClosed} onClose={() => toggleDrawer(true)}>
                    <div style={classes.list}>
                        <List>
                            {drawerItems.map((item, index) => {
                                return (
                                    <React.Fragment key={item.id}>
                                        <ListItem button>
                                            <ListItemText primary={item.title} onClick={() => {
                                                if(item.url){navigate(item.url)}}
                                            }/>
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
                    <Tabs value={active} scrollButtons="on" variant="scrollable">
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