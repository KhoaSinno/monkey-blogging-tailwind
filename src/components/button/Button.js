import { LoadingSpinner } from 'components/loading';
import React from 'react';

const Button = ({ children, isSubmitting, onClick = () => { }, ...props }) => {
    return (
        <div className='flex flex-col gap-2 max-w-[200px] m-[1rem_auto_.3rem] pt-6'>
            <button onClick={onClick} className={`cursor-pointer ${isSubmitting ? 'py-[4px]' : 'py-3'} px-12 bg-gradient-to-r from-[#00A7B4] to-[#A4D96C] text-white font-bold rounded-lg flex items-center justify-center cursor-pointer`} {...props}
            >{isSubmitting ? <LoadingSpinner></LoadingSpinner> : children}</button>
        </div>
    );
};

export default Button;