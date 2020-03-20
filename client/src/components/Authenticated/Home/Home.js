import React, { useState, useEffect } from 'react';

import { makeStyles, Grid } from '@material-ui/core';

import Drawer from './Drawer/Drawer';
import Axios from 'axios';
import { getJWT } from '../../../helpers/jwt';
import Note from './Note/Note';
import Topbar from './Topbar';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
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
        const filtered = pernamentNotes.filter(x => x.desc.includes(term) || x.title.includes(term));
        setNotes(filtered);
      }
    };

  const newNote = async (path, desc, remindDate, tag, title) => {
      if(!path || !desc || !remindDate || !tag || !title)
          return alert('Please fill all information');
        
      path = path.slice(-1) === '/' ? path.slice(0, -1) + '' : path;

      try {
          const res = await Axios.post('/api/notes', { path, title, desc, remindDate, tag },  { headers: { Authorization: getJWT() } } );
          
          if(res.request.status === 200 && res.data) {
            setPernamentNotes([...pernamentNotes, {_id: res.data, path, desc, remindDate, tag, title, createdAt: Date.now()}]);
          }
      } catch(err) {
          alert('Please try again later');
      }
  };

    const deleteNote = async (id) => {
      try {
          const filtered = pernamentNotes.filter(x => x._id !== id);
          setPernamentNotes(filtered);
          const res = await Axios.post('/api/notes/delete', { id },  { headers: { Authorization: getJWT() } } );
      } catch (e) {
          alert(`Oops error, please try again later \n${e}`);
      }
    };

    const checkNote = async (id) => {
      try {
          const res = await Axios.post('/api/notes/check', { id }, { headers: { Authorization: getJWT() } } );

          if(res.status === 200) 
            setPernamentNotes(pernamentNotes.map(item => item._id === id ? {...item, check: !item.check} : item));
          else if(res.data.validation)
            alert('Invalid data');
      } catch (e) {
          alert(`Oops error, please try again later.\n${e}`);
      }
    };

    const saveEditNoteHandle = async (id, newDesc, newTitle) => {
      try {
        const res = await Axios.post('/api/notes/save', { id, newDesc, newTitle },  { headers: { Authorization: getJWT() } })
        if(res.status === 200) 
          setPernamentNotes(pernamentNotes.map(item => item._id === id ? {...item, desc: newDesc, title: newTitle} : item));
      } catch (e) {
          console.log(`Error Save Handle: ${e}`);
      }
    };

    const fetchNotes = async () => {        
      const fNotes = await Axios.get('/api/notes', { headers: { Authorization: getJWT() } } );
      setPernamentNotes(fNotes.data);
    };

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
      fetchNotes();
    }, []);

    useEffect(() => {
      setNotes(pernamentNotes);
    }, [pernamentNotes]);

    return (
        <div className={classes.root}>
            <Topbar notes={pernamentNotes} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} searchNotes={searchNotes}/>

            <Drawer className={classes.drawer}
              classes={classes.drawerPaper}
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
              saveEditNoteHandle={saveEditNoteHandle}
              drawerWidth={drawerWidth}
              newNote={newNote}
              pernamentNotes={pernamentNotes}
            />
            {/* Body */}
            <main className={classes.content}>
              <Grid container style={{justifyContent: 'center'}}>
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