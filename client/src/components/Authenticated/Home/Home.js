import React, { useState, useEffect } from 'react';

import { Typography, AppBar, Toolbar, IconButton,  makeStyles } from '@material-ui/core';

import { Menu as MenuIcon } from '@material-ui/icons';

import Drawer from './Drawer/Drawer';
import Axios from 'axios';
import { getJWT } from '../../../helpers/jwt';

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
                    <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
                    </Typography>
                    
                    <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
          facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
          tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
          consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
          vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
          hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
          tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
          nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
          accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
                    </Typography>

                    {notes.map((note, index)=> {
                      return <Typography key={index} paragraph>{note.title}</Typography>
                    })}
            </main>
        </div>
    );

}

export default Home;