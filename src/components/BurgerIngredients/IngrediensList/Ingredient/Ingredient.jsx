import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Ingredient.module.css";

function Ingredient(props) {
    const handleCkick = () => {
        props.handleOpenModal(props);
    };

    return (
        <div className={styles.wrapper} onClick={handleCkick}>
            <div className={styles.container}>
                <img src={props.image} alt={props.name} className={classNames(styles.image, "mb-1")}/>
                <div className={classNames(styles.price, "mb-1")}>
                    <p className={classNames("text", "text_type_digits-default", "mr-2")}>{props.price}</p>
                    <CurrencyIcon type={"primary"}/>
                </div>
                <div className={styles.description}>
                    <p className={classNames(styles.text, "text", "text_type_main-small")}>
                        {props.name}
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
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
    handleOpenModal: PropTypes.func,
};

export default Ingredient;