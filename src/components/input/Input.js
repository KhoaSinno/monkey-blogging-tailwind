import React from 'react';
import { useController } from 'react-hook-form';

const Input = ({ id: name, type, control, ...props }) => {
    const {
        field,
        fieldState: { invalid, isTouched, isDirty },
        formState: { touchedFields, dirtyFields }
    } = useController({
        name,
        control,
        defaultValue: ''
    });
    console.log("🚀 ~ file: Input.js:13 ~ Input ~ field:", field)
    return (
        <input id={name} type={type} className='w-full px-1 bg-transparent ' {...props} {...field}
        />
    );
};

export default Input;