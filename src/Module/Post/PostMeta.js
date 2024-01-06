import React from 'react';

const PostMeta = ({ typeColor = 'primary' }) => {
    let textCl = ''
    let iconCl = ''
    switch (typeColor) {
        case 'primary':
            textCl = 'text-white'
            iconCl = '#F8F9FA'
            break;
        case 'secondary':
            textCl = 'text-[#6B6B6B]'
            iconCl = '#B1B5C3'
            break;

        default:
            break;
    }
    return (
        <div className={`flex justify-start items-center gap-2 ${textCl}`}>
            <span>Mar 23</span>
            <span><svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                <circle cx="3" cy="3" r="3" fill={iconCl} />
            </svg></span>
            <span>Andiez Le</span>
        </div>
    );
};

export default PostMeta;