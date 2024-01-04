import { Button } from 'components/button';
import React from 'react';

const menuLink = [
    {
        url: '/#',
        title: 'Home',
    },
    {
        url: '/#',
        title: 'Blog',
    },
    {
        url: '/#',
        title: 'Contact',
    },
]

const Header = () => {
    return (
        <div className='pt-20'>
            <div className="container">
                <div className="header-main grid grid-cols-2">
                    <div className="header-left border border-slate-900 flex justify-start items-center gap-x-9">
                        <a href="/#" className='mr-8'>
                            <img alt="monkey-blogging" srcset="/logo.png 2x" className='max-w-[50px] ' />
                        </a>
                        {menuLink.map(({ url, title }) =>
                            <ul key={title} className='font-semibold text-lg'>
                                <li>
                                    <a href={url}>{title}</a>
                                </li>
                            </ul>)}

                    </div>
                    <div className="header-right border border-red-900 flex items-center justify-end gap-x-9">
                        <div className="search flex justify-center items-center w-full  max-w-[320px] rounded-md bg-slate-200 ">
                            <input type="text" placeholder='Search posts...' className='bg-slate-200 w-full rounded-l-md py-2 px-4 focus:bg-slate-100' />
                            <span className='px-1 bg-primary rounded-r-md hover:bg-green-600 cursor-pointer'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 18 17" fill="none" >
                                    <ellipse cx="7.66669" cy="7.05161" rx="6.66669" ry="6.05161" stroke="#ffffff" strokeWidth="1.5" />
                                    <path d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893" stroke="#ffffff" stroke-width="1.5" strokeLinecap="round" />
                                    <path d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </span>
                        </div>
                        <div>
                            <button className='px-11 py-3 text-base font-semibold rounded-lg bg-btnSignUp text-white '>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;