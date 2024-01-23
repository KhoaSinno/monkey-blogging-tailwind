import { ContextSignUp } from 'pages/SignUpPage';
import React, { useContext } from 'react';
import { useController } from 'react-hook-form';
import PropTypes from 'prop-types';
import { ContextSignIn } from 'pages/SignInPage';
import { ContextUserUpdate } from 'Module/user/UserUpdate';
import { ContextProfile } from 'pages/ProfilePage';

const Input = ({ id: name, control, isToggleShowHide, typeInput, ...props }) => {

    const signUpData = useContext(ContextSignUp);
    const signInData = useContext(ContextSignIn);
    const userUpdateData = useContext(ContextUserUpdate);
    const userProfileData = useContext(ContextProfile);

    let type = 'text'
    if (signUpData) {
        type = signUpData?.type
    } else if (signInData) {
        type = signInData?.type
    } else if (userUpdateData) {
        type = userUpdateData?.type
    } else if (userProfileData) {
        type = userProfileData?.type
    }

    const {
        field,
        fieldState: { invalid, isTouched, isDirty },
        formState: { touchedFields, dirtyFields }
    } = useController({
        name,
        control,
        defaultValue: ''
    });
    return (
        <input id={name} name={name} type={isToggleShowHide ? `${type}` : `${typeInput}`} className='w-full px-1 bg-transparent ' {...props} {...field}
        />
    );
};
Input.propTypes = {
    id: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    isToggleShowHide: PropTypes.bool,
    typeInput: PropTypes.string,
};
export default Input;