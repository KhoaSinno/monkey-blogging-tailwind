import PostCategory from "Module/Post/PostCategory";
import PostImage from "Module/Post/PostImage";
import PostMeta from "Module/Post/PostMeta";
import PostNewestItem from "Module/Post/PostNewestItem";
import PostTitle from "Module/Post/PostTitle";
import Heading from "components/layout/Heading";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
// import Heading from "components/layout/Heading";
// import PostNewestItem from "module/post/PostNewestItem";
// import PostNewestLarge from "module/post/PostNewestLarge";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { v4 } from "uuid";

const HomeNewest = () => {
  return (
    <div className="homeNewest-container mb-10">
      <div className="container">
        <Heading>Newest</Heading>
        <div className="grid grid-cols-2 gap-10 justify-center">
          <PostNewestItem heightImg="auto"></PostNewestItem>
          <div className="grid grid-rows-3 gap-y-7 bg-[#F3EDFF] px-6 py-5 rounded-xl">
            <PostNewestItem typeDirection='row'></PostNewestItem>
            <PostNewestItem typeDirection='row'></PostNewestItem>
            <PostNewestItem typeDirection='row'></PostNewestItem>
          </div>
        </div>
        {/* last */}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:gap-10 py-14 ">
          <PostNewestItem heightImg='200px'></PostNewestItem>
          <PostNewestItem heightImg='200px'></PostNewestItem>
          <PostNewestItem heightImg='200px'></PostNewestItem>
          <PostNewestItem heightImg='200px'></PostNewestItem>
        </div>
      </div>
    </div >
  );
};

export default HomeNewest;