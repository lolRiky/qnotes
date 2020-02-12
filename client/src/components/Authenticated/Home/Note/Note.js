import React, { useState } from 'react';

import { Card, CardHeader, CardContent, CardActions, makeStyles, IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import Axios from 'axios';
import { getJWT } from '../../../../helpers/jwt';

const useStyles = makeStyles(theme => ({
    card: {
       
    }
}));

const Note = ({note}) => {

    const [el, setEl] = useState(null);
    const classes = useStyles();

    const handleClose = (e) => {
        setEl(null);
    }

    const openNote = () => {
        alert('openNote');
    }

    const deleteNote = async () => {
        const id = note._id;
        
        console.log(id);
        const res = await Axios.post('/api/notes/delete', { id },  { headers: { Authorization: getJWT() } } );
        console.log(res);
    }

    return (
        <Card className={classes.card}>
            <CardHeader 
            title={note.title} 
            subheader={new Date(note.createdAt).toDateString()}
            action={
                <React.Fragment>
                    <IconButton aria-label='settings' onClick={(e) => setEl(e.currentTarget)}>
                        <MoreVert />
                    </IconButton>
                    <Menu
                    anchorEl={el}
                    keepMounted
                    open={Boolean(el)}
                    onClose={handleClose}>
                        {/* TODO: Add icons */}
                        <MenuItem onClick={openNote}>Open</MenuItem>
                        <MenuItem onClick={deleteNote}>Delete</MenuItem>
                    </Menu>
                </React.Fragment>
            }
            >
            </CardHeader>
            <CardContent>
                {note.desc}
            </CardContent>
        </Card>
    );
};

export default Note;