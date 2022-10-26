import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import styles from "./App.module.css";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
    return (
        <div>
            <AppHeader/>
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
}

export default App;
