import React from 'react';
import { Link } from 'react-router-dom';

const PostCategory = ({ className = '', children, to = '', bgColor = 'primary' }) => {
    switch (bgColor) {
        case 'primary':
            bgColor = 'bg-[#F3EDFF]'
            // bgColor = 'bg-red-500'
            break;
        case 'secondary':
            bgColor = 'bg-[#FFF]'
            break;

        default:
            break;
    }
    return (
        <Link
            to={to}
            className={`py-1 px-2 rounded-xl  text-[#6B6B6B]  ${className} ${bgColor}`}
        >{children}</Link>
    );
};

export default PostCategory;