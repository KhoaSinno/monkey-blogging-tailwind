import { UserContext } from 'pages/SignUpPage';
import React, { useContext } from 'react';
import { useController } from 'react-hook-form';

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

export default Input;