import React, {useMemo} from "react";
import {useSelector, useDispatch} from 'react-redux'
import classNames from "classnames";
import PropTypes from "prop-types";
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Ingredient.module.css";
import {createIngredientSelector} from "../../../../services/selectors/BurgerIngredients";
import {SET_INGREDIENT} from "../../../../services/actions/IngredientDetails";
import {
    burgerConstructorBunIdSelector,
    createBurgerConstructortSelector,
} from '../../../../services/selectors/BurgerConstructor';

import {useDrag} from "react-dnd";

function Ingredient({ingredientId}) {
    const ingredientsSelector = useMemo(() => createIngredientSelector(ingredientId), [ingredientId]);
    const ingredient = useSelector(ingredientsSelector);

    const constructorDataSelector = useMemo(() => createBurgerConstructortSelector(ingredientId), [ingredientId]);
    const constructorData = useSelector(constructorDataSelector);

    const constructorBunId = useSelector(burgerConstructorBunIdSelector);
    const getCountValue = () => {
        if (ingredient.type === 'bun' && constructorBunId === ingredientId) {
            return 1;
        } else if (constructorData)
        {
            return constructorData.count;
        }

        return 0;
    }

    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch({
            type: SET_INGREDIENT,
            ingredientId,
        });
    };

    const [, bunRef] = useDrag({
        type: "ingredientBun",
        item: {_id: ingredientId},
        collect: (monitor) => ({
            isHover: monitor.isDragging(),
        }),
    });

    const [, mainRef] = useDrag({
        type: "ingredientMain",
        item: {...ingredient},
    });

    return (
        <div className={styles.wrapper} onClick={handleClick} ref={ingredient.type === "bun" ? bunRef : mainRef}>
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
                <Counter count={getCountValue()} size="default"/>
            </div>
        </div>
    );
}

Ingredient.propTypes = {
    ingredientId: PropTypes.string,
};

export default Ingredient;