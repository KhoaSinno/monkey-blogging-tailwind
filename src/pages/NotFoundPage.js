import { Button } from 'components/button';
import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className='h-dvh flex items-center justify-center'>
            <NavLink to='/' className=' '>
                <img alt="monkey-blogging" srcSet="/logo.png 2x" className='m-[0_auto_30px]' />
                <h1 className="heading text-center text-[#1DC071] font-bold text-3xl tracking-wide">404 Not Found</h1>
                <Button to='/' classBtn='gradientBtnPrimary text-white' classContainer='mt-10'>Back to HomePage</Button>
            </NavLink>
        </div>
    );
};

export default NotFoundPage;