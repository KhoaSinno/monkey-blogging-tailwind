import React from 'react';
import { NavLink } from 'react-router-dom';
import PostCategory from './PostCategory';
import PostTitle from './PostTitle';
import PostMeta from './PostMeta';
import PostImage from './PostImage';

const PostNewestItem = ({ classContainer = '', heightImg = 'h-full', typeDirection = 'col' }) => {
    return (
        <div className={typeDirection === 'col' ? `cart-item w-auto text-white rounded-xl ${classContainer}` : `cart-item-row h-[180px] overflow-y-auto`}>
            <NavLink to='/' className={typeDirection === 'col' ? `` : `flex gap-x-3`}>
                <PostImage classContainer={typeDirection === 'col' ? heightImg : `w-1/3 max-h-[125px] mt-[8%]`}></PostImage>
                <div className={typeDirection === 'col' ? `content text-[#232323] py-3 rounded-xl` : `w-2/3`}>
                    <PostCategory to='/' bgColor={typeDirection === 'row' ? 'secondary' : ''}>Knowledge</PostCategory>
                    <PostTitle className={`text-xl py-3  ${typeDirection === 'col' ? 'font-semibold' : 'font-medium'}`}>This revision improves the sentence structure and conveys the idea more effectively. </PostTitle>
                    <PostMeta typeColor='secondary'></PostMeta>
                </div>
            </NavLink>
        </div>
    );
};

export default PostNewestItem;