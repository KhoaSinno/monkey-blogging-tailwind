import { LoadingSpinner } from 'components/loading';
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
const Button = ({ children, isSubmitting, onClick = () => { }, classContainer = '', classBtn = '', to, ...props }) => {
    return (
        <>
            <div className={`flex flex-col gap-2 ${classContainer}`}>
                {to !== '' && typeof to === 'string' && to ?
                    <NavLink to={to} onClick={onClick}
                        className={`${isSubmitting ? 'py-[4px]' : 'py-3'} px-12  font-bold rounded-lg flex items-center justify-center cursor-pointer ${classBtn}`} {...props}
                    >{isSubmitting ? <LoadingSpinner></LoadingSpinner> : children}</NavLink>
                    :
                    <NavLink onClick={onClick}
                        className={`${isSubmitting ? 'py-[4px]' : 'py-3'} px-12  font-bold rounded-lg flex items-center justify-center cursor-pointer ${classBtn}`} {...props}
                    >{isSubmitting ? <LoadingSpinner></LoadingSpinner> : children}</NavLink>

                }
            </div>
        </>
    );
};
Button.propTypes = {
    children: PropTypes.node.isRequired,
    isSubmitting: PropTypes.bool,
};
export default Button;