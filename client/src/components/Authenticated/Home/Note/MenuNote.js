import React, { Component } from "react";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        minWidth: 150,
        width: '100%'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto'
    }
}));

const MenuNote = ({title, desc}) => {

    const classes = useStyles();
    
    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component='h5' variant='h5'>{title}</Typography>
                    <Typography variant='subtitle1' color='textSecondary'>{title}</Typography>
                </CardContent>
            </div>
        </Card>
    );
}

export default MenuNote;