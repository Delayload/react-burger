import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import ingredientType from "../IngredientDetails/IngredientDetails";
import styles from "./BurgerConstructor.module.css";

function BurgerConstructor({data}) {
    const [modalVisible, setModalVisible] = React.useState(null);
    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const bun = data.find(ingrediend => ingrediend.type === 'bun');

    return (
        <>
            <section className={cn(styles.wrapper, 'pt-25')}>
                <ul className={'mb-10', styles.list}>
                    {
                        bun &&  (
                            <li className={cn('ml-4', 'mr-4', 'mb-4', styles.item)}>
                                <ConstructorElement
                                    type="top"
                                    isLocked={true}
                                    text={bun.name}
                                    price={bun.price}
                                    thumbnail={bun.image}
                                />
                            </li>
                        )
                    }
                    {
                        data && data.map(item => (
                            <li className={cn('ml-4', 'mr-4', 'mb-4', styles.item)} key={item._id}>
                                <ConstructorElement
                                    isLocked={true}
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                />
                            </li>
                        ))
                    }
                    {
                        bun &&  (
                            <li className={cn('ml-4', 'mr-4', 'mb-4', styles.item)}>
                                <ConstructorElement
                                    type="bottom"
                                    isLocked={true}
                                    text={bun.name}
                                    price={bun.price}
                                    thumbnail={bun.image}
                                />
                            </li>
                        )
                    }
                </ul>
                <div className={cn(styles.priceBlock, 'mt-10')}>
                    <div className={cn(styles.price, 'mr-10')}>
                        <p className={cn("text text_type_digits-medium mr-2")}>610</p>
                        <div className={cn(styles.priceIcon)}>
                            <CurrencyIcon/>
                        </div>
                    </div>
                    <Button type="primary" size="large" onClick={handleOpenModal}>Оформить заказ</Button>
                </div>
            </section>
            { modalVisible && (
                <Modal onClose={handleCloseModal}>
                    <OrderDetails/>
                </Modal>
            )}
        </>
    );
};

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientType).isRequired,
};

export default BurgerConstructor;