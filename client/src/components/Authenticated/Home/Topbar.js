import React, { useState, useEffect } from 'react';

import { Typography, AppBar, Toolbar, makeStyles, IconButton, InputBase, Badge, Menu, MenuItem, fade} from '@material-ui/core';
import { Menu as MenuIcon, Search as SearchIcon, EventNote as EventNoteIcon, Notifications as NotificationsIcon, AccountCircle, MoreVert as MoreVertIcon  } from '@material-ui/icons';
import MenuNote from './Note/MenuNote';
import { logOut } from '../../../helpers/jwt';


const useStyles = makeStyles(theme => ({
  appBar: props => ({
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${props.drawerWidth}px)`,
      marginLeft: props.drawerWidth,
    },
    position: 'fixed !important'
  }),
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  menuNorm: {
    padding: 0
  }
}));

const Topbar = ({handleDrawerToggle, drawerWidth, searchNotes, notes}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [notifEl, setNotifEl] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toTimeString());

  const [weekNotes, setWeekNotes] = useState([]);
  const classes = useStyles({drawerWidth: drawerWidth});

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isNotifMenuOpen = Boolean(notifEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleNotifMenuOpen = event => {
    setNotifEl(event.currentTarget);
  }

  const handleNotifMenuClose = event => {
    setNotifEl(null);
  }

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  useEffect(() => {
    const today = new Date(Date.now());
    const notifNotes = notes.filter(note => {
      // Note.remindDate - week
      const noteDate = new Date(new Date(note.remindDate) - 604800000);
      if(today.getTime() >= noteDate.getTime())
        return note;
        
        return null;
    });
    
    setWeekNotes(notifNotes);
  }, [notes]);

  // Notification Menu
  const notifMenu = (
    <Menu
    anchorEl={notifEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right'}}
    open={isNotifMenuOpen}
    onClose={handleNotifMenuClose}
    >
      {weekNotes.map((weekNote, index) => {
        return <MenuItem key={index} className={classes.menuNorm}>
          <MenuNote title={weekNote.title} desc={weekNote.desc} />
        </MenuItem>
      })}
    </Menu>
  );

  // Menu
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={logOut}>Logout</MenuItem>
    </Menu>
  );

  // Mobile Menu
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <EventNoteIcon />
          </Badge>
        </IconButton>
        <p>Calendar</p>
      </MenuItem>
      <MenuItem onClick={handleNotifMenuOpen}>
        <IconButton color="inherit">
          <Badge badgeContent={weekNotes.length} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
      <div>
          <AppBar position='sticky' className={classes.appBar}>
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
                  <Typography className={classes.title} varient='h6' noWrap>
                      {currentTime}
                  </Typography>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}
                      onChange={ (e) => searchNotes(e.target.value)}
                    />
                  </div>
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                    <IconButton color="inherit">
                      <Badge badgeContent={4} color="secondary">
                        <EventNoteIcon />
                      </Badge>
                    </IconButton>
                    <IconButton onClick={handleNotifMenuOpen} color="inherit">
                      <Badge badgeContent={weekNotes.length} color="secondary">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                  </div>
                  <div className={classes.sectionMobile}>
                    <IconButton
                      aria-label="show more"
                      aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      onClick={handleMobileMenuOpen}
                      color="inherit"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </div>
              </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
          {notifMenu}
          <Toolbar/>
      </div>
  );
};

export default Topbar;