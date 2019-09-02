import React from 'react';
import {Route, Redirect, RouteProps, Switch} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {makeStyles} from '@material-ui/styles';
import Login from './Login';
import {IUser} from '../types';
import Signup from './Signup';
import Feed from './Feed';

interface IProtectedRoute extends RouteProps {
    authenticated: null | IUser;
    redirectPath?: string;
}

class ProtectedRoute extends Route<IProtectedRoute> {
    public render() {
        const {authenticated} = this.props;

        if (!authenticated) {
            return <div>You must be logged in</div>;
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

const useMainStyles = makeStyles({
    routeContainer: {
        height: 1000,
        overflow: 'scroll',
        position: 'absolute',
        top: 72,
        bottom: 35,
        left: 32,
        right: 32,
    },
});


const Routes = () => {
    const classes = useMainStyles();
    const {currentUser} = React.useContext(AuthContext);

    return (
        <div className={classes.routeContainer}>
            <Switch>
                <Route exact path="/" render={() => currentUser ? <Feed /> : <Home />} />
                <AuthRoute authenticated={currentUser} path="/auth/login" component={Login} redirectPath="/" />
                <AuthRoute authenticated={currentUser} path="/auth/signup" component={Signup} redirectPath="/" />
            </Switch>
        </div>
    );
};

export default Routes;
