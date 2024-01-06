import React from 'react';
import { NavLink } from 'react-router-dom';
import PostCategory from './PostCategory';
import PostTitle from './PostTitle';
import PostMeta from './PostMeta';
import Overlay from 'components/layout/Overlay';
import PostImage from './PostImage';

const PostNewestItem = ({ classContainer = '', heightImg = 'h-full' }) => {
    return (
        <div className={`cart-item w-auto relative text-white  rounded-xl ${classContainer}`}>
            <Overlay height='h-[200px]'></Overlay>
            <NavLink to='/' className=''>
                <PostImage classContainer={heightImg}></PostImage>
                <div className="content text-[#232323] py-3 rounded-xl">
                    <PostCategory to='/'>Knowledge</PostCategory>
                    <PostTitle className='text-xl font-semibold py-3'>This revision improves the sentence structure and conveys the idea more effectively. </PostTitle>
                    <PostMeta typeColor='secondary'></PostMeta>
                </div>
            </NavLink>
        </div>
    );
};

export default PostNewestItem;