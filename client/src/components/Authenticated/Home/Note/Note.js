import React from 'react';

import { Card, CardHeader, CardContent, CardActions, makeStyles, IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    card: {
       
    }
}));

const Note = ({note}) => {

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader 
            title={note.title} 
            subheader={new Date(note.createdAt).toDateString()}
            action={
                <IconButton aria-label='settings'>
                    <MoreVert />
                </IconButton>
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