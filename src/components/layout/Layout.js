import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <>
            <Header></Header>
            {children}
        </>
    );
};

export default Layout;