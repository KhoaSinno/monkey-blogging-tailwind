import React from 'react';

const PostImage = ({ classContainer = '', classImg = '', srcSet = '/laptop-img.jpg 2x' }) => {
    return (
        <div className={`${classContainer}`}>
            <img srcSet={srcSet} alt="" className={`w-full object-cover h-full rounded-xl ${classImg}`} />
        </div>
    );
};

export default PostImage;