import React from 'react';

const PostTitle = ({ children, className }) => {
    return (
        <p className={`leading-7 ${className} `}>{children}</p>
    );
};

export default PostTitle;