import React, { useState, useEffect } from 'react';

import { IconButton,  makeStyles, Grid, InputBase, fade, Menu, MenuItem, Badge } from '@material-ui/core';

import { Menu as MenuIcon, Search as SearchIcon, Mail as MailIcon, Notifications as NotificationsIcon, AccountCircle, MoreVert as MoreVertIcon  } from '@material-ui/icons';

import Drawer from './Drawer/Drawer';
import Axios from 'axios';
import { getJWT } from '../../../helpers/jwt';
import Note from './Note/Note';
import Topbar from './Topbar';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    marginLeft: '0px',
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
    },
  },
  note: {
    maxWidth: 290,
    width: '100%',
    margin: theme.spacing(2),
    wordWrap: "break-word"
  },

}));

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [pernamentNotes, setPernamentNotes] = useState([]);
    const [mobileOpen, setMobileOpen] = useState(false);

    const classes = useStyles();
   
    const searchNotes = (term) => {
      if(term === '') {
        setNotes(pernamentNotes);
      } else {
        const filtered = pernamentNotes.filter(x => x.desc.toLowerCase().includes(term.toLowerCase()) || x.title.toLowerCase().includes(term.toLowerCase()));
        setNotes(filtered);
      }
    }

    const deleteNote = async (id) => {
      try {
          const filtered = notes.filter(x => x._id !== id);
          setNotes(filtered);
          await Axios.post('/api/notes/delete', { id },  { headers: { Authorization: getJWT() } } );
      } catch (e) {
          alert(`Oops error, please try again later \n${e}`);
      }
    }

    const checkNote = async (id) => {
      try {
          const res = await Axios.post('/api/notes/check', { id }, { headers: { Authorization: getJWT() } } );

          // Fix here
          if(res.status === 200) {
            notes.forEach(note => {
              if(note._id === id)
                note.check = !note.check;
            });
          }
      } catch (e) {
          alert(`Oops error, please try again later.\n${e}`);
      }
    }

    const saveEditNoteHandle = async (id, newDesc) => {
      try {
        const res = await Axios.post('/api/notes/save', {id, newDesc },  { headers: { Authorization: getJWT() } })

        if(res.status === 200) {

          const cpNotes = [...pernamentNotes];

          cpNotes.forEach(cpNote => {
            if(cpNote._id === id)
            {
              cpNote.desc = newDesc;
            }
          });
          console.log(cpNotes);
        }
      } catch (e) {
          console.log(`Error Save Handle: ${e}`);
      }
    }

    const fetchNotes = async () => {        
      const fNotes = await Axios.get('/api/notes', { headers: { Authorization: getJWT() } } );
      setNotes(fNotes.data);
      setPernamentNotes(fNotes.data);
    };

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
      fetchNotes();
    }, []);

    return (
        <div className={classes.root}>
            <Topbar handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} searchNotes={searchNotes}/>

            <Drawer className={classes.drawer}
              classes={classes.drawerPaper}
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
              drawerWidth={drawerWidth}
            />

            {/* Body */}
            <main className={classes.content}>
              <Grid container>
                {notes.map((note, index)=> {
                  return (
                    <Grid item key={index} className={classes.note}>
                      <Note key={index+0.5} note={note} 
                      deleteNote={deleteNote}
                      checkNote={checkNote}
                      saveEditNoteHandle={saveEditNoteHandle} />
                    </Grid>
                  )
                })}
              </Grid>
            </main>
        </div>
    );

}

export default Home;