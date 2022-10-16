import React from "react";
import {API_URL} from "../../utils/constants";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import {IngredientsContext} from "../../services/IngredientsContext";
import {SET_DATA, SET_ORDER} from "../../actions/actions";
import styles from "./App.module.css";

function reducer(state, action)
{
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                ...action.payload
            };
        case SET_ORDER:
            return {
                ...state,
                order: action.payload,
            };
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}

function App() {
    const [data, setData] = React.useState([]);

    const initialConstructorState = { bun: null, ingredients: [], total: 0, order: null};
    const [constructorData, dispatchContstucorData] = React.useReducer(reducer, initialConstructorState, undefined);

    function getConstructorData(data)
    {
        if (data.length === 0)
        {
            return initialConstructorState;
        }

        return {
            ...initialConstructorState,
            bun: getBun(data),
            ingredients: getIngredients(data),
            total: getTotal(data),
        }
    }

    function getBun(data)
    {
        return data.find(item => item.type === "bun");
    }

    function getIngredients(data)
    {
        return data.filter(item => item.type !== "bun");
    }

    function getTotal(data)
    {
        const bunPrice = getBun(data).price;
        const ingredientsPrice = getIngredients(data).reduce((sum, current) => sum + current.price, 0);

        return bunPrice + ingredientsPrice;
    }

    React.useEffect(() => {
        fetch(`${API_URL}/ingredients`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status)
                }

                return response.json();
            })
            .then((response) => {
                const constructorData = getConstructorData(response.data);
                setData([...response.data]);
                dispatchContstucorData({type: SET_DATA, payload: constructorData});
            })
            .catch((error) => {
                console.log(`Error status ${error}`);
            });
    }, []);

    return (
        <div>
            <AppHeader/>
            <main className={styles.main}>
                <IngredientsContext.Provider value={{constructorData, dispatchContstucorData}}>
                    <div className={styles.wrapper}>
                        <BurgerIngredients data={data}/>
                    </div>
                    <div className={styles.wrapper}>
                        <BurgerConstructor ingredients={data}/>
                    </div>
                </IngredientsContext.Provider>
            </main>
        </div>
    );
}

export default App;
