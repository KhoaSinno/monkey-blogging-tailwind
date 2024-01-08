import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ children, htmlFor = '', className, ...props }) => {
    return (
        <label htmlFor={htmlFor} className={`text-lg font-bold cursor-pointer ${className}`} {...props}>{children}</label>
    );
};

Label.propTypes = {
    htmlFor: PropTypes.string,
    children: PropTypes.node,
};
export default Label;