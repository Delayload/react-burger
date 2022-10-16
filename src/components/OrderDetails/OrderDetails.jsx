import React from "react";
import cn from "classnames";
import styles from "./OrderDetails.module.css";
import icon from "../../images/done.png";
import {IngredientsContext} from "../../services/IngredientsContext";

function OrderDetails() {
    const {constructorData} = React.useContext(IngredientsContext);

    return (
        <div className={styles.wrapper}>
            <p className={cn('text', 'text_type_digits-large', 'mb-8')}>{constructorData.order}</p>
            <p className={cn('text', 'text_type_main-medium', 'mb-15')}>идентификатор заказа</p>
            <img src={icon} alt="done" className={cn("mb-15")}/>
            <p className={cn('text', 'text_type_main-default', 'mb-2')}>Ваш заказ начали готовить</p>
            <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>Дождитесь готовности на
                орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;