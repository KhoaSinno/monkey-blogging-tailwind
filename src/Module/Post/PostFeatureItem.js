import Overlay from 'components/layout/Overlay';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PostCategory from './PostCategory';
import PostMeta from './PostMeta';
import PostTitle from './PostTitle';

const PostFeatureItem = () => {
    return (
        <div className="cart-item w-auto h-[17rem]  text-white relative rounded-xl">
            <Overlay></Overlay>
            <NavLink to='/xyz'>
                <img srcSet="/laptop-img.jpg 2x" alt="" className="w-full object-cover h-full rounded-xl " />
                <div className="content absolute inset-0 p-5 rounded-xl">
                    <div className="flex justify-between">
                        <PostCategory to='/'>Knowledge</PostCategory>
                        <PostMeta></PostMeta>
                    </div>
                    <PostTitle className='text-xl'>This revision improves the sentence structure and conveys the idea more effectively. </PostTitle>
                </div>
            </NavLink>
        </div>
    );
};

export default PostFeatureItem;