import React, {useEffect} from 'react';
import cn from 'classnames';
import { NavLink, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Routes } from '../../utils/routes';

import styles from './ProfileMenu.module.css';
import { logout } from '../../services/actions/Auth';
import { isLoggedInAuthSelector } from '../../services/selectors/auth';

function ProfileMenu() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(isLoggedInAuthSelector);
    const location = useLocation();
    useEffect(() => {

    }, [isLoggedIn]);

    const onExitLinkClick = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    if (!isLoggedIn)
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

    return (
        <div className={cn(styles.navWrapper, 'mr-15')}>
            <nav className={'mb-20'}>
                <ul>
                    <li className={styles.navItem}>
                        <NavLink
                            to={Routes.profile}
                            className={cn(styles.navLink, 'text', 'text_type_main-medium')}
                            activeClassName={cn(styles.activeLink, 'text', 'text_type_main-medium')}
                            exact={true}
                        >
                            Профиль
                        </NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink
                            to={Routes.profileOrders}
                            className={cn(styles.navLink, 'text', 'text_type_main-medium')}
                            activeClassName={cn(styles.activeLink, 'text', 'text_type_main-medium')}
                            exact={true}
                        >
                            История заказов
                        </NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink
                            to={Routes.login}
                            onClick={onExitLinkClick}
                            className={cn(styles.navLink, 'text', 'text_type_main-medium')}
                            activeClassName={cn(styles.activeLink, 'text', 'text_type_main-medium')}
                            exact={true}
                        >
                            Выход
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>В этом разделе вы можете
                изменить свои персональные данные</p>
        </div>
    );
}

export default ProfileMenu;