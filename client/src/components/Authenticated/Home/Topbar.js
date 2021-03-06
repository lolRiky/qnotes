import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
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

const Topbar = ({handleDrawerToggle, drawerWidth, searchNotes, notes, history }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [notifEl, setNotifEl] = useState(null);
  const [currentTime, setCurrentTime] = useState('time');
  const [todaysNotesCounter, setTodaysNotesCounter] = useState(0);

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
    const time = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);

    return () => clearInterval(time);
  }, []);

  const sameDay = (d1, d2) => {
    return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
  }

  const dateCheck = (from,to,check) => {

    var fDate,lDate,cDate;
    fDate = Date.parse(from);
    lDate = Date.parse(to);
    cDate = Date.parse(check);

    if((cDate <= lDate && cDate >= fDate)) {
        return true;
    }
    return false;
}

  useEffect(() => {
    const today = new Date();
    const todayPlusWeek = new Date(today.getTime() + 604800000);
    setTodaysNotesCounter(0);
    const notifNotes = notes.filter(note => {
      
      const noteDate = new Date(note.remindDate);
      if(dateCheck(today, todayPlusWeek, noteDate)) {
        setTodaysNotesCounter(prevCount => prevCount + 1);
      }

      // Note.remindDate - week
      if(sameDay(today, new Date(note.remindDate)))
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
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
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
      <MenuItem onClick={() => history.push('/Calendar')}>
        <IconButton title="Number of tasks for following week" color="inherit">
          <Badge badgeContent={todaysNotesCounter} color="secondary">
            <EventNoteIcon />
          </Badge>
        </IconButton>
        <p>Calendar</p>
      </MenuItem>
      <MenuItem onClick={handleNotifMenuOpen}>
        <IconButton title="Number of tasks for today" color="inherit">
          <Badge badgeContent={weekNotes.length} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          title="Account"
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
                    <IconButton title="Number of tasks for following week" color="inherit" onClick={() => history.push('/Calendar')}>
                      <Badge badgeContent={todaysNotesCounter} color="secondary">
                        <EventNoteIcon />
                      </Badge>
                    </IconButton>
                    <IconButton title="Number of tasks for today" onClick={handleNotifMenuOpen} color="inherit">
                      <Badge badgeContent={weekNotes.length} color="secondary">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                    <IconButton
                      title="Account"
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

export default withRouter(Topbar);