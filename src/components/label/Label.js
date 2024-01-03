import React from 'react';

const Label = ({ children, htmlFor, ...props }) => {
    return (
        <label htmlFor={htmlFor} className='text-lg font-bold cursor-pointer' {...props}>{children}</label>
    );
};

export default Label;