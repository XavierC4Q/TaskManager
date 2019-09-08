import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {makeStyles, createStyles} from '@material-ui/styles';
import {Theme} from '@material-ui/core';
import {AuthContext} from '../context/AuthContext';

const useNavbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: 64,
            background: '#21acd6'
        },
        navItem: {
            flexGrow: 1,
            margin: theme.spacing(4),
            color: '#ffffff'
        },
    }),
);

const Navbar = () => {
    const {currentUser, logout} = React.useContext(AuthContext);
    const classes = useNavbarStyles();
    const profileUrl = currentUser ? `/user/profile/${currentUser.id}` : '';

    const authLinks = (
        <React.Fragment>
            <Link to="/auth/login" color="inherit" component={RouterLink}>
                <Typography variant="h6" className={classes.navItem}>
                    Login
                </Typography>
            </Link>
            <Link to="/auth/signup" color="inherit" component={RouterLink}>
                <Typography variant="h6" className={classes.navItem}>
                    Sign Up
                </Typography>
            </Link>
        </React.Fragment>
    );

    const userLinks = (
        <React.Fragment>
            <Link to={profileUrl} color="inherit" component={RouterLink}>
                <Typography variant="h6" className={classes.navItem}>
                    Profile
                </Typography>
            </Link>
            <Link to="/user/tasks" color="inherit" component={RouterLink}>
                <Typography variant="h6" className={classes.navItem}>
                    New Task
                </Typography>
            </Link>
        </React.Fragment>
    );
    return (
        <AppBar color="primary" className={classes.root} position="static">
            <Toolbar>
                <Typography variant="h5" className={classes.navItem}>
                    <Link to="/" color="inherit" component={RouterLink}>
                        Task Manager
                    </Link>
                </Typography>
                {currentUser ? userLinks : authLinks}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
