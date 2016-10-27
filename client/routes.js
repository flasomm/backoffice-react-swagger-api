import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Home,
    Signup,
    ForgotPassword,
    NotFound
} from 'containers';

export default () => {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="signup" component={Signup}/>
            <Route path="forgot-password" component={ForgotPassword}/>
            <Route path="*" component={NotFound} status={404}/>
        </Route>
    );
};