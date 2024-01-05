import { Button } from 'components/button';
import React from 'react';
import { NavLink } from 'react-router-dom';

const HomeBanner = () => {
    return (
        <div className="homeBanner-container py-6">
            <div className='min-h-[520px] bg-gradient-to-r from-[#00A7B4] to-[#A4D96C] flex items-center justify-center p-6'>
                <div className='w-2/4 text-white p-3'>
                    <h2 className='text-4xl font-bold pb-5 tracking-wider'>Monkey Blogging</h2>
                    <p className='tracking-wide leading-7 pb-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.</p>
                    <Button
                        classContainer='w-[300px]'
                        classBtn='bg-white text-third'
                    >Get Started</Button>
                </div>
                <div className='w-2/4'>
                    <NavLink to='/'>
                        <img alt="" srcset="/img-banner.png 2x" className='w-[500px] m-auto cursor-pointer' />
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;