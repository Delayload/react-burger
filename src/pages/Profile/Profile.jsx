import React from 'react';

import FormWrapper from '../../components/ui/FormWrapper/FormWrapper';
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';
import ProfileForm from '../../components/ProfileForm/ProfileForm';

import styles from './Profile.module.css';

function Profile() {
    return (
        <FormWrapper>
            <div className={styles.container}>
                <ProfileMenu/>
                <ProfileForm/>
            </div>
        </FormWrapper>
    );
};

export default Profile;