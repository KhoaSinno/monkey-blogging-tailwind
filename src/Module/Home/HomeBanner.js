import { Button } from 'components/button';
import React from 'react';
import { NavLink } from 'react-router-dom';

const HomeBanner = () => {
    return (
        <div className="homeBanner-container pt-5 pb-12">
            <div className='min-h-[520px] bg-gradient-to-r from-[#00A7B4] to-[#A4D96C] flex items-center justify-center p-7'>
                <div className='w-2/4 p-3'>
                    <h2 className='text-4xl font-bold pb-5 tracking-wider text-white'>Monkey Blogging</h2>
                    <p className='tracking-wide leading-7 pb-5 text-white'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.</p>
                    <Button
                        to='/dashboard'
                        classContainer='w-[300px]'
                        classBtn='bg-white text-green-600 transition-all hover:text-green-400'
                    >Get Started</Button>
                </div>
                <div className='w-2/4 '>
                    <NavLink to='/dashboard'>
                        <img alt="" srcSet="/img-banner.png 2x" className='w-[500px] m-auto cursor-pointer' />
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;