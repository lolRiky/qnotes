import React, { useState, useEffect } from 'react';

import './note.css';

import { Card, CardHeader, CardContent, makeStyles, IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert, Delete as DeleteIcon, OpenInNew as OpenInNewIcon, Check as CheckIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    card: props => ({
        background: props.background
    })
}));

/* 
orange: 255, 200, 47
yellow: 255, 189, 6
blue: 17, 166, 232
green: 60, 205, 66
red: rgba(255, 10, 0, 0.74)
*/
const Note = ({note, deleteNote, checkNote}) => {

    const [el, setEl] = useState(null);
    const [color, setColor] = useState('');

    const classes = useStyles({background: color});

    const handleClose = (e) => {
        setEl(null);
    }

    const openNote = () => {
        alert('openNote');
    }

    useEffect(() => {
        switch(note.tag) {
            case 'No category':
                setColor('rgb(255, 200, 47)');
                break;

            case 'School':
                setColor('rgb(194, 132, 109)');
                break;

            case 'Work':
                setColor('rgba(255, 10, 0, 0.74)');
                break;

            case 'Life':
                setColor('rgb(60, 205, 66)');
                break;

            case 'Personal':
                setColor('rgb(17, 166, 232)');
                break;
                
            case 'Business':
                setColor('pink');
                break;

            default:
                setColor('white');
                break;
        }
    }, []);

    return (
        // <Card className={`note note-${note.tag}`}>
        <Card className={classes.card}>
            <CardHeader 
            title={note.title} 
            subheader={new Date(note.createdAt).toDateString()}
            action={
                <React.Fragment>
                    {note.check ? <CheckIcon /> : <script />}
                    <IconButton aria-label='settings' onClick={(e) => setEl(e.currentTarget)}>
                        <MoreVert />
                    </IconButton>
                    <Menu
                    anchorEl={el}
                    keepMounted
                    open={Boolean(el)}
                    onClose={handleClose}>
                        <MenuItem onClick={openNote}><OpenInNewIcon /> Open</MenuItem>
                        <MenuItem onClick={ () => { checkNote(note._id); setEl(null); }}><CheckIcon /> Check</MenuItem>
                        <MenuItem onClick={ () => { deleteNote(note._id); setEl(null); }}><DeleteIcon /> Delete</MenuItem>
                    </Menu>
                </React.Fragment>
            }
            >
            </CardHeader>
            <CardContent>
                {note.desc.split('\n').map((line, index) => {
                    return <p key={index}>{line}</p>;
                })}
            </CardContent>
        </Card>
    );
};

export default Note;