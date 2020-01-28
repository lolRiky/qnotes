import React from 'react';

import { Card, CardHeader, CardContent, CardActions, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
        margin: theme.spacing(2)
    }
}));

const Note = ({note}) => {

    const classes = useStyles();

    return (
        <div>
            <Card className={classes.card}>
                <CardHeader title={note.title} subheader={note.createdAt}>
                </CardHeader>
                <CardContent>
                    {note.desc}
                </CardContent>
            </Card>
        </div>
    );
};

export default Note;