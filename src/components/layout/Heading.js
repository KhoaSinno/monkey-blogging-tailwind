import React from 'react';

const Heading = ({ children, textColor = 'text-[#3A1097]' }) => {
    return (
        <h2 className={`heading-before ${textColor}`}>{children}</h2>

    );
};

export default Heading;