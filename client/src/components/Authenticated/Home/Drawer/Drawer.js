import React from 'react';

import { Hidden, Drawer as DrawerUi, makeStyles } from '@material-ui/core';

import DrawerBody from './DrawerBody';


/* Drawer/Navigation */
const Drawer = (props) => {

    const useStyles = makeStyles(theme => ({
        drawer: {
            [theme.breakpoints.up('md')]: {
                width: props.drawerWidth,
                flexShrink: 0,
            },
        },
        drawerPaper: {
            width: props.drawerWidth,
        },
    }));

    const classes = useStyles();

    return (
        <nav className={classes.drawer} aria-label='mailbox folders'>
            <Hidden smUp implementation='css'>
                <DrawerUi
                    // container={container}
                    variant='temporary'
                    anchor='left'
                    open={props.mobileOpen}
                    onClose={props.handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    ModalProps={{
                        // Better open performence on mobile
                        keepMounted: true,
                    }}
                >
                    <DrawerBody newNote={props.newNote} />
                </DrawerUi>
            </Hidden>
            <Hidden smDown implementation='css'>
                <DrawerUi
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    variant='permanent'
                    open
                >
                    <DrawerBody newNote={props.newNote} />
                </DrawerUi>
            </Hidden>
        </nav>
    );

}

export default Drawer;