import React, {useMemo} from "react";
import {useSelector} from 'react-redux';
import cn from "classnames";
import PropTypes from "prop-types";
import styles from "./IngredientDetails.module.css";
import {createIngredientSelector} from "../../services/selectors/BurgerIngredients";

function IngredientDetails({ingredientId}) {
    const ingredientsSelector = useMemo(() => createIngredientSelector(ingredientId), [ingredientId])
    const ingredient = useSelector(ingredientsSelector);
    
    return (
        <div className={styles.wrapper}>
            <img src={ingredient.image} alt={ingredient.name} className={cn('mb-4', styles.image)}/>
            <h2 className={cn('text', 'text_type_main-medium', 'mb-8')}>{ingredient.name}</h2>
            <div className={styles.about}>
                <div className={styles.info}>
                    <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>Калории,ккал</p>
                    <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>{ingredient.calories}</p>
                </div>
                <div className={styles.info}>
                    <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>Белки, г</p>
                    <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>{ingredient.proteins}</p>
                </div>
                <div className={styles.info}>
                    <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>Жиры, г</p>
                    <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>{ingredient.fat}</p>
                </div>
                <div className={styles.info}>
                    <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>Углеводы, г</p>
                    <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>{ingredient.carbohydrates}</p>
                </div>
            </div>
        </div>
    );
};

IngredientDetails.propTypes = {
    ingredientId: PropTypes.string,
};

export default IngredientDetails;