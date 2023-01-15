import React, {useState, useSelector} from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';

import BasicLink from './../../components/ui/BasicLink/BasicLink';
import FormWrapper from '../../components/ui/FormWrapper/FormWrapper';

import { Routes } from '../../utils/routes';

import styles from './ResetPassword.module.css';
import {isForgotPasswordSucceedAuthSelector} from '../../services/selectors/auth';
import { Redirect, useLocation } from 'react-router-dom';

function ResetPassword() {

    const [formData, setFormData] = useState({password: '', code: ''});
    const onChangeFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const [showPassword, setShowPassword] = useState(false);
    const onPasswordIconClick = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    const isForgotPasswordSucceed = useSelector(isForgotPasswordSucceedAuthSelector);
    const location = useLocation();
    if (!isForgotPasswordSucceed)
    {
        return (
            <Redirect
                to={{
                    pathname: Routes.login,
                    state: { from: location }
                }}
            />
        );
    }

    return (
        <FormWrapper>
            <h1 className={cn('text', 'text_type_main-medium')}>Восстановление пароля</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputWrapper}>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        name={'password'}
                        value={formData.password}
                        placeholder={'Пароль'}
                        onChange={onChangeFormData}
                        icon={showPassword ? 'HideIcon' : 'ShowIcon'}
                        onIconClick={onPasswordIconClick}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <Input
                        type={'text'}
                        name={'code'}
                        value={formData.code}
                        placeholder={'Введите код из письма'}
                        onChange={onChangeFormData}
                    />
                </div>
                <div className={styles.buttonWrapper}>
                    <Button>Сохранить</Button>
                </div>
            </form>
            <div className={styles.textWrapper}>
                <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>Вспомнили пароль?</p>
                <BasicLink href={Routes.login} text={'Войти'}/>
            </div>
        </FormWrapper>
    );
};

export default ResetPassword;