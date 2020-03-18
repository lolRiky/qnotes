import React from 'react';

import { Hidden, Drawer as DrawerUi, makeStyles } from '@material-ui/core';

import DrawerBody from './DrawerBody';

const useStyles = makeStyles(theme => ({
    drawer: props => ({
        [theme.breakpoints.up('md')]: {
            width: props.drawerWidth,
            flexShrink: 0,
        },
    }),
    drawerPaper: props => ({
        width: props.drawerWidth,
    }),
}));

/* Drawer/Navigation */
const Drawer = (props) => {

    const classes = useStyles({drawerWidth: props.drawerWidth});

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
                    <DrawerBody newNote={props.newNote} 
                    pernamentNotes={props.pernamentNotes}
                    saveEditNoteHandle={props.saveEditNoteHandle} />
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
                    <DrawerBody newNote={props.newNote} 
                    pernamentNotes={props.pernamentNotes}
                    saveEditNoteHandle={props.saveEditNoteHandle} />
                </DrawerUi>
            </Hidden>
        </nav>
    );

};

export default Drawer;