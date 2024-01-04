import { UserContext } from 'pages/SignUpPage';
import React, { useContext } from 'react';
import { useController } from 'react-hook-form';
import PropTypes from 'prop-types';

const Input = ({ id: name, control, isToggleShowHide, typeInput, ...props }) => {
    const { type } = useContext(UserContext);
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