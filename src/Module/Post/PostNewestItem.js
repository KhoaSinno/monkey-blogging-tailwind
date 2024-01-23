import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PostCategory from './PostCategory';
import PostTitle from './PostTitle';
import PostMeta from './PostMeta';
import PostImage from './PostImage';

const PostNewestItem = ({ classContainer = '', heightImg = 'h-full', typeDirection = 'col', data }) => {
    console.log('data', data)
    const {
        id: postId, slug: slugPost, image, title,
        category: { createdAt, slug: slugCategory, name },
        user
    } = data
    return (
        <div className={typeDirection === 'col' ? `cart-item w-auto text-white rounded-xl ${classContainer}` : `cart-item-row h-[180px] overflow-y-auto`}>
            <Link to={`/${slugPost}`} className={typeDirection === 'col' ? `` : `flex gap-x-3`}>
                <PostImage
                    srcSet={image}
                    classContainer={typeDirection === 'col' ? heightImg : `w-1/3 max-h-[125px] mt-[8%]`}
                    typeDirection={typeDirection}
                ></PostImage>
                <div className={typeDirection === 'col' ? `content text-[#232323] py-3 rounded-xl` : `w-2/3`}>
                    <PostCategory
                        to={slugCategory}
                        bgColor={typeDirection === 'row' ? 'secondary' : 'primary'}
                    >{name}</PostCategory>
                    <PostTitle
                        className={`text-xl py-3  ${typeDirection === 'col' ? 'font-semibold' : 'font-medium'}`}
                    >{title}</PostTitle>
                    <PostMeta data={user} createdAt={createdAt} typeColor='secondary'></PostMeta>
                </div>
            </Link>
        </div>
    );
};

export default PostNewestItem;