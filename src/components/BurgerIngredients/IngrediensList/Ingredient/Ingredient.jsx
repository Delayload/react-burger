import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientType} from "../../../../utils/propTypes";
import styles from "./Ingredient.module.css";

function Ingredient({ingredient, handleOpenModal}) {
    const handleClick = () => {
        handleOpenModal(ingredient);
    };

    return (
        <div className={styles.wrapper} onClick={handleClick}>
            <div className={styles.container}>
                <img src={ingredient.image} alt={ingredient.name} className={classNames(styles.image, "mb-1")}/>
                <div className={classNames(styles.price, "mb-1")}>
                    <p className={classNames("text", "text_type_digits-default", "mr-2")}>{ingredient.price}</p>
                    <CurrencyIcon type={"primary"}/>
                </div>
                <div className={styles.description}>
                    <p className={classNames(styles.text, "text", "text_type_main-small")}>
                        {ingredient.name}
                    </p>
                </div>
            </div>
            <div className={styles.counter}>
                <Counter count={1} size="default"/>
            </div>
        </div>
    );
}

Ingredient.propTypes = {
    ingredient: ingredientType.isRequired,
    handleOpenModal: PropTypes.func.isRequired,
};

export default Ingredient;