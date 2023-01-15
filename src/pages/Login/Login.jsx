import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';

import BasicLink from './../../components/ui/BasicLink/BasicLink';
import FormWrapper from '../../components/ui/FormWrapper/FormWrapper';

import {Routes} from '../../utils/routes';
import {login} from '../../services/actions/Auth';
import {isLoggedInAuthSelector} from '../../services/selectors/auth';

import styles from './Login.module.css';

function Login() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({email: '', password: ''});
    const onChangeFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const [showPassword, setShowPassword] = useState(false);
    const onPasswordIconClick = () => setShowPassword(!showPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData.email, formData.password));
    };

    const isLoggedIn = useSelector(isLoggedInAuthSelector);
    if (isLoggedIn) {
        return (
            <Redirect to={Routes.home}/>
        );
    }

    return (
        <FormWrapper>
            <h1 className={cn('text', 'text_type_main-medium')}>Вход</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                    <Input
                        type={'email'}
                        name={'email'}
                        placeholder={'E-mail'}
                        value={formData.email}
                        onChange={onChangeFormData}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        name={'password'}
                        placeholder={'Пароль'}
                        icon={showPassword ? 'HideIcon' : 'ShowIcon'}
                        onIconClick={onPasswordIconClick}
                        value={formData.password}
                        onChange={onChangeFormData}
                    />
                </div>
                <div className={cn(styles.buttonContainer, 'mb-20', 'mt-6')}>
                    <Button htmlType='submit' type='primary' size='medium'>Войти</Button>
                </div>
            </form>
            <div className={styles.textContainer}>
                <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>Вы — новый пользователь?</p>
                <BasicLink href={Routes.register} text={'Зарегистрироваться'}></BasicLink>
            </div>
            <div className={styles.textContainer}>
                <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>Забыли пароль?</p>
                <BasicLink href={Routes.forgotPassword} text={'Восстановить пароль'}></BasicLink>
            </div>
        </FormWrapper>
    );
};

export default Login;