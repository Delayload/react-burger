import React from 'react';
import cn from 'classnames';

import styles from './AppHeader.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink, useLocation } from 'react-router-dom';

import { ProfileMenu }  from '../ProfileMenu/ProfileMenu';

function AppHeader() {
    const location = useLocation();

    return (
        <header className={cn(styles.header, 'p-4')}>
            <nav className={styles.navigation}>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <NavLink to={'/'} exact={true} className={cn(styles.link, 'p-4')} activeClassName={cn(styles.activeLink, 'p-4')}>
                            <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary' }/>
                            <p className={cn('text', 'text_type_main-default', 'ml-2')}>Конструктор</p>
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink to={'/orders-feed'} exact={true} className={cn(styles.link, 'p-4')} activeClassName={cn(styles.activeLink, 'p-4')}>
                            <ListIcon type={location.pathname === '/orders-feed' ? 'primary' : 'secondary' }/>
                            <p className={cn('text', 'text_type_main-default', 'ml-2')}>Лента заказов</p>
                        </NavLink>
                    </li>
                </ul>
                <NavLink to={'/'} className={styles.link}>
                    <div className={styles.logo}>
                        <Logo/>
                    </div>
                </NavLink>
                <div className={styles.item}>
                    <NavLink to={'/profile'} className={cn(styles.link, 'p-4')} activeClassName={cn(styles.activeLink, 'p-4')}>
                        <ProfileIcon type={location.pathname === '/profile' ? 'primary' : 'secondary' } />
                        <p className={cn('text', 'text_type_main-default', 'ml-2')}>Личный кабинет</p>
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}

export default AppHeader;