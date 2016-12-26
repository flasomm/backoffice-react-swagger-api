import React from 'react';
import {IndexRoute, Route} from 'react-router';
import auth from 'containers/utils/auth'
import {
    App,
    Home,
    Signup,
    SignupSuccess,
    Login,
    Logout,
    ForgotPassword,
    Dashboard,
    Profiles,
    NotFound
} from 'containers';

function requireAuth(nextState, replace) {
    if (!auth.isAuthenticated()) {
        replace({
            pathname: '/login',
            state: {nextPathname: nextState.location.pathname}
        })
    }
}

export default () => {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="signup" component={Signup}/>
            <Route path="signup-success" component={SignupSuccess}/>
            <Route path="login" component={Login}/>
            <Route path="logout" component={Logout}/>
            <Route path="forgot-password" component={ForgotPassword}/>
            <Route path="dashboard" component={Dashboard} onEnter={requireAuth}/>
            <Route path="profiles" component={Profiles} onEnter={requireAuth}/>
            <Route path="*" component={NotFound} status={404}/>
        </Route>
    );
};