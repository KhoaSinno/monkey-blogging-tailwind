import React from 'react';

const PostTitle = ({ children, className }) => {
    return (
        <p className={`leading-7 max-h-[200px] overflow-y-auto ${className} `}>{children}</p>
    );
};

export default PostTitle;