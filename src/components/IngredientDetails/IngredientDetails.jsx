import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import styles from "./IngredientDetails.module.css";

function IngredientDetails(props) {
    return (
        <div className={styles.wrapper}>
            <img src={props.image} alt={props.name} className={cn('mb-4', styles.image)}/>
            <h2 className={cn('text', 'text_type_main-medium', 'mb-8')}>{props.name}</h2>
            <div className={styles.about}>
                <div className={styles.info}>
                    <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>Калории,ккал</p>
                    <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>{props.calories}</p>
                </div>
                <div className={styles.info}>
                    <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>Белки, г</p>
                    <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>{props.proteins}</p>
                </div>
                <div className={styles.info}>
                    <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>Жиры, г</p>
                    <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>{props.fat}</p>
                </div>
                <div className={styles.info}>
                    <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>Углеводы, г</p>
                    <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>{props.carbohydrates}</p>
                </div>
            </div>
        </div>
    );
};

export const ingredientType = PropTypes.shape({
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
});

IngredientDetails.propTypes = {
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
};

export default IngredientDetails;