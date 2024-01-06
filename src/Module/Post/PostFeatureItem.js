import Overlay from 'components/layout/Overlay';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PostCategory from './PostCategory';
import PostMeta from './PostMeta';
import PostTitle from './PostTitle';
import PostImage from './PostImage';

const PostFeatureItem = () => {
    return (
        <div className="cart-item w-auto h-[17rem] relative text-white  rounded-xl">
            <NavLink to='/xyz'>
                <PostImage></PostImage>
                <div className="content absolute inset-0 p-5 rounded-xl">
                    <div className="flex justify-between">
                        <PostCategory to='/'>Knowledge</PostCategory>
                        <PostMeta></PostMeta>
                    </div>
                    <PostTitle className='text-xl font-medium pt-5'>This revision improves the sentence structure and conveys the idea more effectively. </PostTitle>
                </div>
            </NavLink>
        </div>
    );
};

export default PostFeatureItem;