import React from "react";
import cn from "classnames";
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {IngredientsContext} from "../../services/IngredientsContext";
import {API_URL} from "../../utils/constants";
import styles from "./BurgerConstructor.module.css";
import {SET_ORDER} from "../../actions/actions";

function BurgerConstructor() {
    const {constructorData, dispatchContstucorData} = React.useContext(IngredientsContext);
    const [modalVisible, setModalVisible] = React.useState(null);

    const handleOrderButtonClick = () => {
        fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"ingredients": getIngredientsIds()})
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.status)
            }

            return response.json();
        }).then(response => {
            dispatchContstucorData({type: SET_ORDER, payload: response.order.number})
            handleOpenModal();
        }).catch(error => {
            console.log(`Error status ${error}`);
        })
    }

    const getIngredientsIds = () => {
        if (!constructorData.bun || !constructorData.ingredients) {
            return null;
        }

        return [ constructorData.bun, ...constructorData.ingredients.map(item => item._id)]
    }

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <section className={cn(styles.wrapper, 'pt-25')}>
                <ul className={cn('mb-10', styles.list)}>
                    {
                        constructorData.bun &&  (
                            <li className={cn('ml-4', 'mr-4', styles.item)}>
                                <div className={styles.itemIconWrapper}></div>
                                <div className={styles.constructorWrapper}>
                                    <ConstructorElement
                                        type="top"
                                        isLocked={true}
                                        text={`${constructorData.bun.name} (верх)`}
                                        price={constructorData.bun.price}
                                        thumbnail={constructorData.bun.image}
                                    />
                                </div>
                            </li>
                        )
                    }
                    {
                        constructorData.ingredients && (
                            <ul className={cn(styles.innerList, 'mt-4', 'mb-4')}>
                                {
                                    constructorData.ingredients.map(item => (
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
                        constructorData.bun &&  (
                            <li className={cn('ml-4', 'mr-4', styles.item)}>
                                <div className={styles.itemIconWrapper}></div>
                                <div className={styles.constructorWrapper}>
                                    <ConstructorElement
                                        type="bottom"
                                        isLocked={true}
                                        text={`${constructorData.bun.name} (низ)`}
                                        price={constructorData.bun.price}
                                        thumbnail={constructorData.bun.image}
                                    />
                                </div>
                            </li>
                        )
                    }
                </ul>
                {
                    constructorData.bun && (
                        <div className={cn(styles.priceBlock, 'mt-10')}>
                            <div className={cn(styles.price, 'mr-10')}>
                                <p className={cn("text text_type_digits-medium mr-2")}>{constructorData.total}</p>
                                <div className={cn(styles.priceIcon)}>
                                    <CurrencyIcon/>
                                </div>
                            </div>
                            <Button type="primary" size="large" onClick={handleOrderButtonClick}>Оформить заказ</Button>
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

export default BurgerConstructor;