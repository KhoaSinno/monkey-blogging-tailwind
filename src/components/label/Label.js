import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ children, htmlFor, ...props }) => {
    return (
        <label htmlFor={htmlFor} className='text-lg font-bold cursor-pointer' {...props}>{children}</label>
    );
};

Label.propTypes = {
    htmlFor: PropTypes.string.isRequired,
    children: PropTypes.node,
};
export default Label;