import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppHeader from '../AppHeader/AppHeader';
import { Home, Register, Login, ForgotPassword, ResetPassword, Profile } from '../../pages';

import { Routes } from '../../utils/routes';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
    return (
        <>
            <AppHeader/>
            <Switch>
                <Route path={Routes.home} exact={true}>
                    <Home/>
                </Route>
                <Route path={Routes.register} exact={true}>
                    <Register/>
                </Route>
                <Route path={Routes.login} exact={true}>
                    <Login/>
                </Route>
                <Route path={Routes.forgotPassword} exact={true}>
                    <ForgotPassword/>
                </Route>
                <Route path={Routes.resetPassword} exact={true}>
                    <ResetPassword/>
                </Route>
                <ProtectedRoute path={Routes.profile} exact={true}>
                    <Profile/>
                </ProtectedRoute>
                <ProtectedRoute path={Routes.profileOrders} exact={true}>
                    <div className={'p-20'}>
                        История заказов
                    </div>
                </ProtectedRoute>
                <Route>
                    <div className={'p-20'}>
                        <p>404 - not found</p>
                    </div>
                </Route>
            </Switch>
        </>
    );
}

export default App;
