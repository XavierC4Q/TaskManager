import React from 'react';
import {Route, Redirect, RouteProps, Switch} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {makeStyles, createStyles} from '@material-ui/styles';
import Login from './Login';
import {IUser} from '../types';
import Signup from './Signup';
import DashBoard from './DashBoard';
import Profile from './Profile';
import { Theme } from '@material-ui/core';

interface IProtectedRoute extends RouteProps {
    authenticated: null | IUser;
    redirectPath: string;
}

class ProtectedRoute extends Route<IProtectedRoute> {
    public render() {
        const {authenticated, redirectPath} = this.props;

        if (!authenticated) {
            return <Redirect to={redirectPath} />;
        }

        return <Route {...this.props} />;
    }
}

class AuthRoute extends Route<IProtectedRoute> {
    public render() {
        const {authenticated, redirectPath} = this.props;

        if (!authenticated) {
            return <Route {...this.props} />;
        }
        return <Redirect to={redirectPath as string} />;
    }
}

const Home = () => <div>Welcome Home</div>;

const useMainStyles = makeStyles((theme: Theme) => createStyles({
    routeContainer: {
        height: 1000,
        overflow: 'scroll',
        position: 'absolute',
        top: theme.spacing(9),
        bottom: theme.spacing(4.5),
        left: theme.spacing(4),
        right: theme.spacing(4),
        marginTop: theme.spacing(4)
    },
}));

const Routes = () => {
    const classes = useMainStyles();
    const {currentUser} = React.useContext(AuthContext);

    return (
        <div className={classes.routeContainer}>
            <Switch>
                <Route exact path="/" render={() => (currentUser ? <DashBoard /> : <Home />)} />
                <AuthRoute authenticated={currentUser} path="/auth/login" component={Login} redirectPath="/" />
                <AuthRoute authenticated={currentUser} path="/auth/signup" component={Signup} redirectPath="/" />
                <ProtectedRoute
                    authenticated={currentUser}
                    path="/user/profile/:userId"
                    component={Profile}
                    redirectPath="/"
                />
            </Switch>
        </div>
    );
};

export default Routes;
