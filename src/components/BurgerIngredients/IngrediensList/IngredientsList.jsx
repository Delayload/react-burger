import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import Ingredient from "./Ingredient/Ingredient";
import {ingredientType} from "../../../utils/propTypes";
import styles from "./IngredientsList.module.css";

function IngredientsList({title, items, handleOpenModal}) {
    return (
        <div className={styles.wrapper}>
            <h3 className={cn("text", "text_type_main-medium", "mb-6")}>{title}</h3>
            <ul className={cn(styles.list, "pl-4", "pr-4", "mb-2")}>
                {
                    items.map((item) => (
                        <li className={"mb-8"} key={item._id}>
                            <Ingredient ingredient={item} handleOpenModal={handleOpenModal}/>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

IngredientsList.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(ingredientType).isRequired,
    handleOpenModal: PropTypes.func.isRequired,
};

export default IngredientsList;