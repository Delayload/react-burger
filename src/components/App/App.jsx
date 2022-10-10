import React from "react";
import {API_URL} from "../../utils/constants";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import styles from "./App.module.css";

function App() {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        fetch(`${API_URL}/ingredients`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status)
                }

                return response.json();
            })
            .then((response) => {
                setData([...response.data]);
            })
            .catch((error) => {
                console.log(`Error status ${error}`);
            });
    }, []);

    return (
        <div>
            <AppHeader/>
            <main className={styles.main}>
                <div className={styles.wrapper}>
                    <BurgerIngredients data={data}/>
                </div>
                <div className={styles.wrapper}>
                    <BurgerConstructor data={data}/>
                </div>
            </main>
        </div>
    );
}

export default App;
