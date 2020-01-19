import React, { useState } from 'react';

import { AddCircleOutline } from '@material-ui/icons';
import { getJWT } from '../../../../helpers/jwt';

// Remove when treeview will come
import { List, ListItem, ListItemIcon, ListItemText, 
    Divider, makeStyles, TextField, Button, 
    DialogContent, DialogTitle, DialogActions, Dialog,
     } from '@material-ui/core';
import { MoveToInbox as InboxIcon, Menu as MenuIcon } from '@material-ui/icons';
import axios from 'axios';

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
    },
    extendedIcon: {
        margin: theme.spacing(1)
    }
}));

// Body of Drawer/Navigation
const DrawerBody = () => {

    const [open, setOpen] = useState(false);
    const [path, setPath] = useState('');
    const [title, setTitle] = useState('');
    
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const newNote = async (e) => {
        e.preventDefault();
        
        const res = await axios.post('/api/notes', { path, title },  { headers: { Authorization: getJWT() } } );
    };

    return (
        <div className={classes.drawerLayout}>
            {/* TODO: Tree view of notes */}
            <div>
                <List>
                    <ListItem button key='New Note' onClick={handleClickOpen}>
                        <ListItemIcon><AddCircleOutline/></ListItemIcon>
                        <ListItemText primary='New Note'/>
                    </ListItem>
                </List>

                <Dialog onClose={handleClose} open={open} title='New Note'>
                    
                    <DialogTitle>New Note</DialogTitle>
                    <form onSubmit={e => newNote(e)}>
                        <DialogContent>
                            <TextField name='title' onChange={e => setTitle(e.target.value)} value={title} label='Title' fullWidth InputLabelProps={{
                                shrink: true
                            }}/>
                            <TextField name='path' onChange={e => setPath(e.target.value)} value={path} label='Path' fullWidth InputLabelProps={{
                                shrink: true
                            }}/>
                        </DialogContent>
                        
                        <DialogActions>
                            <Button type='submit' variant='contained' color='primary'>Create a note</Button>
                        </DialogActions>
                    </form>

                </Dialog>

                <Divider />
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