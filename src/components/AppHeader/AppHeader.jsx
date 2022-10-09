import React from 'react';
import cn from 'classnames';

import styles from './AppHeader.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
    return (
        <header className={cn(styles.header, 'p-4')}>
            <nav className={styles.navigation}>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <a href="/" className={cn(styles.link, 'p-4')}>
                            <BurgerIcon type={'primary'}/>
                            <p className={cn('text', 'text_type_main-default', 'ml-2', styles.activeLink)}>Text</p>
                        </a>
                    </li>
                    <li className={styles.item}>
                        <a href="/" className={cn(styles.link, 'p-4')}>
                            <ListIcon type={'secondary'}/>
                            <p className={cn('text', 'text_type_main-default', 'ml-2')}>Text</p>
                        </a>
                    </li>
                </ul>
                <a href="/" className={styles.link}>
                    <div className={styles.logo}>
                        <Logo/>
                    </div>
                </a>
                <div className={styles.item}>
                    <a href="/" className={cn(styles.link, 'p-4')}>
                        <ProfileIcon type={'secondary'}/>
                        <p className={cn('text', 'text_type_main-default', 'ml-2')}>Text</p>
                    </a>
                </div>
            </nav>
        </header>
    );
}

export default AppHeader;