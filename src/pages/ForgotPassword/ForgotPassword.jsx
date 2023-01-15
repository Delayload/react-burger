import React, { useState } from 'react';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';

import BasicLink from './../../components/ui/BasicLink/BasicLink';
import FormWrapper from '../../components/ui/FormWrapper/FormWrapper';

import { Routes } from '../../utils/routes';

import styles from './ForgotPassword.module.css';

function ForgotPassword() {
    const [formData, setFormData] = useState({email: ''});
    const onChangeFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <FormWrapper>
            <h1 className={cn('text', 'text_type_main-medium')}>Восстановление пароля</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                    <Input
                        type={'email'}
                        name={'email'}
                        value={formData.email}
                        placeholder={'E-mail'}
                        onChange={onChangeFormData}
                    />
                </div>
                <div className={cn(styles.buttonContainer, 'mb-20')}>
                    <Button htmlType='button' type='primary' size='medium'>
                        Восстановить
                    </Button>
                </div>
            </form>
            <div className={styles.textContainer}>
                <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>Вспомнили пароль?</p>
                <BasicLink href={Routes.login} text={'Войти'}/>
            </div>
        </FormWrapper>
    );
};

export default ForgotPassword;