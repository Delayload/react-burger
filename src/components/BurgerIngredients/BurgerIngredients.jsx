import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from "./IngrediensList/IngredientsList";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import styles from "./BurgerIngredients.module.css";

function BurgerIngredients({data}) {
    const [currentTab, setCurrentTab] = React.useState(null);
    const [currentIngredient, setCurrentIngredient] = React.useState(null);
    const itemsRef = React.useRef([]);

    const handleOpenModal = (item) => {
        setCurrentIngredient(item);
    };

    const handleCloseModal = () => {
        setCurrentIngredient(null);
    };

    const onTabClick = (value) => {
        const index = Object.keys(categories).findIndex((key) => key === value);
        itemsRef.current[index].scrollIntoView();
        setCurrentTab(value);
    }

    const categories = data.reduce((acc, item) => {
        if (acc[item.type]) {
            acc[item.type].items.push({
                ...item,
                handleOpenModal,
            });
        }

        return acc;
    }, {
        bun: {title: "Булки", items: []},
        main: {title: "Начинки", items: []},
        sauce: {title: "Соусы", items: []},
    });

    return (
        <>
            <section className={classNames(styles.wrapper, "mt-10")}>
                <h2 className={classNames("text", "text_type_main-large", "mb-5")}>Соберите бургер</h2>
                <div className={classNames(styles.tabs, "mb-10")}>

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
                <div className={styles.categories}>
                    {
                        Object.keys(categories).map((key, index) => {
                            return categories[key].items.length !== 0 && (
                                <div key={key} ref={el => itemsRef.current[index] = el}>
                                    <IngredientsList items={categories[key].items} title={categories[key].title}/>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            {
                currentIngredient && (
                    <Modal title={"Детали ингредиента"} onClose={handleCloseModal}>
                        <IngredientDetails {...currentIngredient}/>
                    </Modal>
                )
            }
        </>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.array,
};

export default BurgerIngredients;