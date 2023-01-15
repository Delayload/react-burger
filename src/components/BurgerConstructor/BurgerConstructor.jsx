import React, {useMemo} from "react";
import cn from "classnames";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import styles from "./BurgerConstructor.module.css";
import BurgerConstructorItem from './BurgerConstructorItem/BurgerConstructorItem';
import { makeOrder } from "../../services/actions/OrderDetails";
import { useHistory } from 'react-router-dom';

import {useDispatch, useSelector} from "react-redux";
import {burgerConstructorDataSelector, burgerConstructorBunIdSelector} from '../../services/selectors/BurgerConstructor';
import {createIngredientSelector} from '../../services/selectors/BurgerIngredients';
import {orderSelector} from '../../services/selectors/OrderDetails';

import {addIngredient, SET_CONSTRUCTOR_BUN} from '../../services/actions/BurgerConstructor';
import {ORDER_UNSET} from '../../services/actions/OrderDetails';
import {isLoggedInAuthSelector} from '../../services/selectors/auth';
import { getCookie } from '../../utils/cookie';
import { Routes } from '../../utils/routes';

import { useDrop } from "react-dnd";

function BurgerConstructor() {
    const dispatch = useDispatch();
    const constructorData = useSelector(burgerConstructorDataSelector);
    const constructorBunId = useSelector(burgerConstructorBunIdSelector);
    const orderData = useSelector(orderSelector);
    const isLoggedIn = useSelector(isLoggedInAuthSelector);
    const history = useHistory();

    const bunSelector = useMemo(() => createIngredientSelector(constructorBunId), [constructorBunId]);
    const bun = useSelector(bunSelector);

    const handleOrderButtonClick = () => {
        if (!isAvailableToOrder()) {
            history.push('/login');
        }

        const constructorDataIds = constructorData.map(item => item._id);
        dispatch(makeOrder([...constructorDataIds, constructorBunId]))
        handleOpenModal();
    }

    const [modalVisible, setModalVisible] = React.useState(null);

    const totalPrice = useMemo(() => {
        const bunPrice = bun ? bun?.price * 2 : 0;
        const price =
            bunPrice +
            constructorData.reduce((acc, item) => {
                return acc + item.price * item.count;
            }, 0);
        return price ? price : 0;
    }, [constructorData, bun]);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        dispatch({type: ORDER_UNSET});
        setModalVisible(false);
    };

    const [{ isHoverBun }, dropTarget] = useDrop({
        accept: "ingredientBun",
        collect: (monitor) => ({
            isHoverBun: monitor.isOver(),
        }),
        drop(ingredient) {
            dispatch({
                type: SET_CONSTRUCTOR_BUN,
                _id: ingredient._id,
            })
        },
    });
    const [{ isHoverMain }, dropTargetMain] = useDrop({
        accept: "ingredientMain",
        collect: (monitor) => ({
            isHoverMain: monitor.isOver(),
        }),
        drop(ingredient) {
            dispatch(addIngredient(ingredient));
        },
    });

    const opacityBun = isHoverBun ? "0.5" : "1";
    const opacityMain = isHoverMain ? "0.5" : "1";

    const isAvailableToOrder = () => {
        return getCookie('token') && isLoggedIn;
    }

    return (
        <>
            <section className={cn(styles.wrapper, 'pt-25')}>
                <ul className={cn('mb-10', styles.list)} ref={dropTarget} style={{ opacity: opacityBun }}>
                    {
                        bun ?  (
                            <li className={cn('ml-10', 'mr-4', styles.item)}>
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
                        ) : (
                            <div className={styles.itemPlaceHolderContainer}>
                                <p className={cn('text', 'text text_type_digits-medium')}>Выберите булку (верх)</p>
                            </div>
                        )
                    }
                    <div ref={dropTargetMain}>
                        {
                            constructorData.length ? (
                                <ul className={cn(styles.innerList, 'mt-4', 'mb-4')} style={{ opacity: opacityMain, padding: "0" }}>
                                    {
                                        constructorData.map((item, index) => (
                                            <li className={cn('ml-4', 'mr-4', styles.item)} key={item.uuid}>
                                                <BurgerConstructorItem item={item} index={index}/>
                                            </li>
                                        ))
                                    }
                                </ul>
                            ) : (
                                <div className={styles.itemPlaceHolderContainer}>
                                    <p className={cn('text', 'text text_type_digits-medium')}>Выберите ингредиент</p>
                                </div>
                            )
                        }
                    </div>
                    {
                        bun ?  (
                            <li className={cn('ml-10', 'mr-4', styles.item)}>
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
                        ) : (
                            <div className={styles.itemPlaceHolderContainer}>
                                <p className={cn('text', 'text text_type_digits-medium')}>Выберите булку (низ)</p>
                            </div>
                        )
                    }
                </ul>
                <div className={cn(styles.priceBlock, 'mt-10')}>
                    <div className={cn(styles.price, 'mr-10')}>
                        <p className={cn("text text_type_digits-medium mr-2")}>{totalPrice}</p>
                        <div className={cn(styles.priceIcon)}>
                            <CurrencyIcon/>
                        </div>
                    </div>
                    <Button type="primary" size="large" onClick={handleOrderButtonClick}>Оформить заказ</Button>
                </div>
            </section>
            { modalVisible && (
                <Modal onClose={handleCloseModal}>
                    {
                        orderData?.order?.number ? (<OrderDetails number={orderData.order.number}/>) : (
                            <p>Оформляем заказ...</p>

                        )
                    }
                </Modal>
            )}
        </>
    );
};

export default BurgerConstructor;