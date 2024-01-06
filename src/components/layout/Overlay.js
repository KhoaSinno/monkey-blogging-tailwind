import React from 'react';

const Overlay = ({ height = 'h-full' }) => {
    return (
        <div className={`overlay rounded-xl absolute top-0 left-0 w-full ${height} bg-black opacity-50`}></div>
    );
};

export default Overlay;