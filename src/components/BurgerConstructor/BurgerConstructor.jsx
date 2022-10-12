import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {ingredientType} from "../../utils/types";
import styles from "./BurgerConstructor.module.css";

function BurgerConstructor({ingredients}) {
    const [modalVisible, setModalVisible] = React.useState(null);
    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const bun = ingredients && ingredients.find(ingrediend => ingrediend.type === 'bun');
    const filling = ingredients.filter(ingredient => ingredient.type !== 'bun');

    return (
        <>
            <section className={cn(styles.wrapper, 'pt-25')}>
                <ul className={'mb-10', styles.list}>
                    {
                        bun &&  (
                            <li className={cn('ml-4', 'mr-4', styles.item)}>
                                <div className={styles.itemIconWrapper}></div>
                                <div className={styles.constructorWrapper}>
                                    <ConstructorElement
                                        type="top"
                                        isLocked={true}
                                        text={`${bun.name} (верх)`}
                                        price={bun.price}
                                        thumbnail={bun.image}
                                    />
                                </div>
                            </li>
                        )
                    }
                    {
                        ingredients && (
                            <ul className={cn(styles.innerList, 'mt-4', 'mb-4')}>
                                {
                                    filling.map(item => (
                                        <li className={cn('ml-4', 'mr-4', styles.item)} key={item._id}>
                                            <div className={styles.itemIconWrapper}>
                                                <DragIcon type="primary" />
                                            </div>
                                            <div className={styles.constructorWrapper}>
                                                <ConstructorElement
                                                    text={item.name}
                                                    price={item.price}
                                                    thumbnail={item.image}
                                                />
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }
                    {
                        bun &&  (
                            <li className={cn('ml-4', 'mr-4', styles.item)}>
                                <div className={styles.itemIconWrapper}></div>
                                <div className={styles.constructorWrapper}>
                                    <ConstructorElement
                                        type="bottom"
                                        isLocked={true}
                                        text={`${bun.name} (низ)`}
                                        price={bun.price}
                                        thumbnail={bun.image}
                                    />
                                </div>
                            </li>
                        )
                    }
                </ul>
                {
                    ingredients.length !== 0 && (
                        <div className={cn(styles.priceBlock, 'mt-10')}>
                            <div className={cn(styles.price, 'mr-10')}>
                                <p className={cn("text text_type_digits-medium mr-2")}>610</p>
                                <div className={cn(styles.priceIcon)}>
                                    <CurrencyIcon/>
                                </div>
                            </div>
                            <Button type="primary" size="large" onClick={handleOpenModal}>Оформить заказ</Button>
                        </div>
                    )
                }
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
    ingredients: PropTypes.arrayOf(ingredientType).isRequired,
};

export default BurgerConstructor;