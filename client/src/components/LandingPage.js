import React from "react";
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Button, makeStyles, Grid } from '@material-ui/core';

import Folder from './shared/SVG/Folder';
import Logo from '../assets/logo32.png';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    margin: {
        marginRight: theme.spacing(2),
    },
    toolbar: theme.mixins.toolbar,
    title: {
        flexGrow: 1,
    },
    main: {
        height: '100vh !important'
    }
}));

const LandingPage = () => {
    const classes = useStyles();

    return (
        <div>
            <AppBar posittion='fixed' className={classes.root}>
                <Toolbar>
                    <div className={classes.title}>
                        <img src={Logo} alt="logo" />
                    </div>
                    <Button className={classes.margin} component={Link} to='/Login' color='inherit'>Login</Button>
                    <Button component={Link} to='/Register' color='inherit'>Register</Button>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbar}></div>
            {/* Hero Section */}
            <Grid container justify='space-evenly' alignItems='center' className={classes.main} className='h:sm-nowrap'>
                <Grid item md={12} lg>
                    <div>
                        <Typography variant='h4' style={{ textAlign: 'center' }}>Want To Take Notes Quickly?</Typography>
                        <Typography variant='h5' style={{ textAlign: 'center' }}>Everything In One Place</Typography>
                    </div>
                </Grid>
                <Grid item md={12} lg style={{textAlign: 'center'}}>
                    <Folder style={mainSvg} />
                </Grid>
            </Grid>
            <div className='m24'></div>
            <Grid container justify='center' alignItems='flex-start'>
                <Grid item xs={12} sm md={3} lg={3} className='p16'>
                    <Typography variant='subtitle1'>Quick</Typography>
                    <Typography variant='body1'>Quickly take notes</Typography>
                </Grid>
                <Grid item xs={12} sm md={3} lg={3} className='p16'>
                    <Typography variant='subtitle1'>Everything In One Place</Typography>
                    <Typography variant='body1'>Your laptop, tablet or a smartphone have your notes</Typography>
                </Grid>
                <Grid item xs={12} sm md={3} lg={3} className='p16'>
                    <Typography variant='subtitle1'>Calendar</Typography>
                    <Typography variant='body1'>Plan out your day looking your tasks of the day</Typography>
                </Grid>
            </Grid>

            <div style={{textAlign: 'center'}}>
                <Typography variant='h5' style={{margin: '16px'}}>Try for free!</Typography>
                <Button component={Link} to='/Register' variant='outlined' color='primary'>REGISTER</Button>
            </div>
        </div>
    );

};

export default LandingPage;

const mainSvg = {
    maxWidth: '600px',
    width: '100%'
};