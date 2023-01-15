import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerIngredients  from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor  from  '../../components/BurgerConstructor/BurgerConstructor';

import styles from './Home.module.css';

function Home() {
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <main className={styles.main}>
                    <div className={styles.wrapper}>
                        <BurgerIngredients/>
                    </div>
                    <div className={styles.wrapper}>
                        <BurgerConstructor/>
                    </div>
                </main>
            </DndProvider>
        </div>
    );
};

export default Home;