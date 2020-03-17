import React, { useState, useEffect } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import { getJWT } from '../../helpers/jwt';
import Axios from 'axios';

const localizer = momentLocalizer(moment);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    margin: {
        marginRight: theme.spacing(2),
    },
    toolbar: theme.mixins.toolbar,
    title: {
        flexGrow: 1
    },
}));

const CalendarPage = ({history}) => {
    const [notes, setNotes] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date().toTimeString());
  
    const classes = useStyles();
    
    const fetchNotes = async () => {        
        const res = await Axios.get('/api/notes', { headers: { Authorization: getJWT() } } );
              
        const mod = res.data.reduce((obj, note) => {
            obj.push({ title: note.title, start: new Date(note.remindDate), end: new Date(note.remindDate) });
            return obj;
        }, []);
        setNotes(mod);
      };
  
      useEffect(() => {
        const time = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
          
        fetchNotes();
        
        return () => clearInterval(time);
      }, []);

    return (
        <>
            <AppBar posittion='fixed' className={classes.root}>
                <Toolbar>
                    <Typography variant='h6' className={classes.title}>
                        {currentTime}
                    </Typography>
                    <Button onClick={ () => history.push('/Home') } color='inherit'>Home</Button>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbar}></div>
            <Calendar
                localizer={localizer}
                events={notes}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }} />
        </>
    );
};

export default CalendarPage;