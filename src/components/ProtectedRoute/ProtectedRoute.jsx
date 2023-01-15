import { useSelector } from 'react-redux';
import PropTypes from "prop-types";
import { Route, Redirect, useLocation } from 'react-router-dom';
import { isLoggedInAuthSelector } from '../../services/selectors/auth';
import { Routes } from '../../utils/routes';

import { getCookie } from '../../utils/cookie';

function ProtectedRoute({path, exact, children, ...rest}) {
    const isLoggedIn = useSelector(isLoggedInAuthSelector);
    const location = useLocation();

    if (!getCookie('token') || !isLoggedIn)
    {
        if (location.pathname !== Routes.login)
        {
            return (
                <Redirect
                    to={{
                        pathname: Routes.login,
                        state: { from: location }
                    }}
                />
            );
        }
    }

    return (
        <Route {...rest}>
            {children}
        </Route>
    );
}
ProtectedRoute.propTypes = {
    path: PropTypes.string,
    exact: PropTypes.bool,
    cchildren: PropTypes.node,
};

export default ProtectedRoute;