import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { userAuthSelector } from '../../services/selectors/auth';
import { setUserData } from '../../services/actions/Auth';

import styles from './ProfileForm.module.css';

const InputTypes = {
    name: 'name',
    email: 'email',
    password: 'password',
};

function ProfileForm() {
    const dispatch = useDispatch();
    const userData = useSelector(userAuthSelector);

    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [isFormChanged, setFormChanged] = useState(false);


    useEffect(() => {
        setNameValue(userData?.name ?? '');
        setEmailValue(userData?.email ?? '');
    }, [userData]);

    const onResetForm = () => {
        setFormChanged(false);

        setNameValue(userData?.name ?? '');
        setEmailValue(userData?.email ?? '');
        setPasswordValue('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setUserData(nameValue, emailValue, passwordValue));
    };

    const onChangeInput = (type, value) => {
        setFormChanged(true);

        switch (type) {
            case InputTypes.name:
                setNameValue(value);
                break;
            case InputTypes.email:
                setEmailValue(value);
                break;
            case InputTypes.password:
                setPasswordValue(value);
        }
    }

    return (
        <div>
            <form className={styles.formWrapper} onSubmit={handleSubmit}>
                <div className={styles.inputWrapper}>
                    <Input
                        type={'text'}
                        name={InputTypes.name}
                        placeholder={'Имя'}
                        onChange={e => onChangeInput(InputTypes.name, e.target.value)}
                        icon={'EditIcon'}
                        value={nameValue}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <Input
                        type={'text'}
                        name={InputTypes.email}
                        placeholder={'Логин'}
                        onChange={e => onChangeInput(InputTypes.email, e.target.value)}
                        icon={'EditIcon'}
                        value={emailValue}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <Input
                        type={'password'}
                        name={InputTypes.password}
                        placeholder={'Пароль'}
                        onChange={e => onChangeInput(InputTypes.password, e.target.value)}
                        icon={'EditIcon'}
                        value={passwordValue}
                    />
                </div>
                { isFormChanged && (
                    <div className={styles.buttonsContainer}>
                        <Button htmlType="reset" type="primary" size="medium" onClick={onResetForm}>Отмена</Button>
                        <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
                    </div>
                )}
            </form>
        </div>
    );
}

export default ProfileForm;