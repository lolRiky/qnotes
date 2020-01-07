import React from 'react';

// Remove when treeview will come
import { List, ListItem, ListItemIcon, ListItemText, Divider, makeStyles } from '@material-ui/core';
import { MoveToInbox as InboxIcon, Menu as MenuIcon } from '@material-ui/icons';

import LogOut from '../../../shared/LogOut';

const useStyles = makeStyles(theme => ({
    drawerLayout: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh'
    },
    full: {
      width: '100%'
    }
}));

// Body of Drawer/Navigation
const DrawerBody = () => {

    const classes = useStyles();

    return (
        <div className={classes.drawerLayout}>
            {/* TODO: Tree view of notes */}
            <div>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MenuIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MenuIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
            <div>
                <LogOut style={classes.full} />
            </div>
        </div>
    );
};

export default DrawerBody;