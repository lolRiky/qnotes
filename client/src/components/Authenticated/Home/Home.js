import React, { useState, useEffect } from 'react';

import { Typography, AppBar, Toolbar, IconButton,  makeStyles, Grid } from '@material-ui/core';

import { Menu as MenuIcon } from '@material-ui/icons';

import Drawer from './Drawer/Drawer';
import Axios from 'axios';
import { getJWT } from '../../../helpers/jwt';
import Note from './Note/Note';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    marginLeft: '0px',
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
    },
  },

}));

const Home = () => {
    const [notes, setNotes] = useState([{}]);

    const [mobileOpen, setMobileOpen] = useState(false);
    const classes = useStyles();
   
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    
    const fetchNotes = async () => {        
      const fNotes = await Axios.get('/api/notes', { headers: { Authorization: getJWT() } } );
      setNotes(fNotes.data);
    };

    useEffect(() => {
      fetchNotes();
    }, []);

    return (
        <div className={classes.root}>
            <AppBar position='fixed' className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        edge='start'
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography varient='h6' noWrap>
                        Notes
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer className={classes.drawer}
              classes={classes.drawerPaper}
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
              handleDrawerToggle={handleDrawerToggle}
              drawerWidth={drawerWidth}
            />

            {/* Body */}
            <main className={classes.content}>
              <Grid container>
                {notes.map((note, index)=> {
                  return (
                    <Grid item key={index}>
                      <Note key={index+0.5} note={note} />
                    </Grid>
                  )
                })}
              </Grid>
            </main>
        </div>
    );

}

export default Home;