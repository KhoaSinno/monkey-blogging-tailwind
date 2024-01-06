import React from 'react';

const PostTitle = ({ children, className }) => {
    return (
        <p className={`font-medium tracking-wide leading-7 pt-5 ${className}`}>{children}</p>
    );
};

export default PostTitle;