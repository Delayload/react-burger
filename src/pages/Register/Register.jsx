import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';

import { Routes } from '../../utils/routes';

import BasicLink from './../../components/ui/BasicLink/BasicLink';
import FormWrapper from '../../components/ui/FormWrapper/FormWrapper';

import { regiser } from '../../services/actions/Auth';

import styles from './Register.module.css';

function Register() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
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
        dispatch(regiser(formData.email, formData.password, formData.name));
    };

    return (
        <FormWrapper>
           <h1 className={cn('text', 'text_type_main-medium')}>Регистрация</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                    <Input
                        type={'text'}
                        name={'name'}
                        value={formData.name}
                        placeholder={'Имя'}
                        onChange={onChangeFormData}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <Input
                        type={'email'}
                        name={'email'}
                        value={formData.email}
                        placeholder={'E-mail'}
                        onChange={onChangeFormData}
                    />
                </div>
                <div className={styles.inputContainer}>
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
                <div className={cn('mb-20', styles.buttonWrapper)}>
                    <Button htmlType='submit' type='primary' size='medium'>
                        Зарегистрироваться
                    </Button>
                </div>
            </form>
            <div className={cn(styles.textWrapper)}>
                <p className={cn('text', 'text_type_main-default', 'text_color_inactive')}>Уже зарегистрированы?</p>
                <BasicLink href={Routes.login} text={'Войти'}/>
            </div>
        </FormWrapper>
    );
};

export default Register;