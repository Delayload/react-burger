import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styles from './BurgerConstructorItem.module.css';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { REPLACE_CONSTRUCTOR_ITEM, DELETE_CONSTRUCTOR_INGREDIENT } from "../../../services/actions/BurgerConstructor";

function BurgerConstructorItem({item, index}) {
    const dispatch = useDispatch();
    const ref = useRef(null);

    const [, drag] = useDrag({
        type: "replace",
        item: { index },
    });
    const [{ isHover }, dropRef] = useDrop({
        accept: "replace",
        drop(item) {
            dispatch({
                type: REPLACE_CONSTRUCTOR_ITEM,
                oldIndex: item.index,
                newIndex: index,
            });
        },
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
    });
    drag(dropRef(ref));

    const handleDelete = (_id) => {
        dispatch({type: DELETE_CONSTRUCTOR_INGREDIENT, _id})
    }

    return (
        <div className={styles.wrapper} ref={ref} draggable style={isHover ? { opacity: "0.5" } : {}}>
            <div className={styles.itemIconWrapper}>
                <DragIcon type="primary" />
            </div>
            <div className={styles.constructorWrapper}>
                <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={() => handleDelete(item._id)}
                />
            </div>
        </div>
    )
}

BurgerConstructorItem.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        uuid: PropTypes.string.isRequired,
    }),
    index: PropTypes.number.isRequired,

}

export default BurgerConstructorItem;