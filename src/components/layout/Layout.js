import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <div className='homePage-container pb-10'>
            <Header></Header>
            {children}
        </div>
    );
};

export default Layout;