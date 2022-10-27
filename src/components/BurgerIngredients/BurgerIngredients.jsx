import React, {useRef} from "react";
import classNames from "classnames";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from "./IngrediensList/IngredientsList";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import styles from "./BurgerIngredients.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/BurgerIngredients";
import {ingredientsIdsByCategoriesSelector,} from "../../services/selectors/BurgerIngredients";
import {ingredientDetailsDataSelector} from "../../services/selectors/IngredientDetails";

import {UNSET_INGREDIENT} from "../../services/actions/IngredientDetails";

function BurgerIngredients() {
    const dispatch = useDispatch();
    const rootRef = useRef();

    const categories = useSelector(ingredientsIdsByCategoriesSelector);

    const ingredientId = useSelector(ingredientDetailsDataSelector);

    React.useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    const [currentTab, setCurrentTab] = React.useState(null);
    const itemsRef = React.useRef([]);

    const onTabClick = (value) => {
        itemsRef.current[value].scrollIntoView({ behavior: "smooth" });
        setCurrentTab(value);
    }

    const handleCloseModal = () => {
        dispatch({
            type: UNSET_INGREDIENT,
        });
    };

    const handleScroll = (e) => {
        const rootY = rootRef.current.getBoundingClientRect().y;
        for (var key of Object.keys(itemsRef.current)) {
            const y = itemsRef.current[key].getBoundingClientRect().y - rootY;
            if (y > 0 && y < rootY && currentTab !== y) {
                setCurrentTab(key);
            }
        }
    }

    return (
        <>
            <section className={classNames(styles.wrapper, "mt-10")}>
                <h2 className={classNames("text", "text_type_main-large", "mb-5")}>Соберите бургер</h2>
                <div className={classNames(styles.tabs, "mb-10")} ref={rootRef}>

                    <div className={styles.tab}>
                        <Tab active={currentTab === "bun"} value="bun" onClick={onTabClick}>
                            Булки
                        </Tab>
                    </div>
                    <div className={styles.tab}>
                        <Tab active={currentTab === "main"} value="main" onClick={onTabClick}>
                            Начинки
                        </Tab>
                    </div>
                    <div className={styles.tab}>
                        <Tab active={currentTab === "sauce"} value="sauce" onClick={onTabClick}>
                            Соусы
                        </Tab>
                    </div>
                </div>
                <div className={styles.categories} onScroll={handleScroll}>
                    {
                        Object.entries(categories).map(([key, items]) => items.length !== 0 && (
                            <div key={key} ref={el => itemsRef.current[key] = el}>
                                <IngredientsList items={categories[key].items} title={categories[key].title}/>
                            </div>
                        ))
                    }
                </div>
            </section>
            {
                ingredientId && (
                    <Modal title={"Детали ингредиента"} onClose={handleCloseModal}>
                        <IngredientDetails ingredientId={ingredientId}/>
                    </Modal>
                )
            }
        </>
    );
}

export default BurgerIngredients;