import { ContextSignUp } from 'pages/SignUpPage';
import React, { useContext } from 'react';
import { useController } from 'react-hook-form';
import PropTypes from 'prop-types';
import { ContextSignIn } from 'pages/SignInPage';

const Input = ({ id: name, control, isToggleShowHide, typeInput, ...props }) => {

    const signUpData = useContext(ContextSignUp);
    const signInData = useContext(ContextSignIn);

    let type = 'text'
    if (signUpData) {
        type = signUpData?.type
    } else {
        type = signInData?.type
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