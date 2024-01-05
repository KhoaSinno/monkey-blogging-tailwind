import { db } from "firebase-app/firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
// import PostFeatureItem from "module/post/PostFeatureItem";
// import Heading from "components/layout/Heading";

import React, { useEffect, useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { Link, NavLink } from "react-router-dom";

const HomeFeature = () => {
  return (
    <div className="homeFeature-container mb-10">
      <div className="container">
        <h2 className="heading-before text-[#3A1097]">Feature</h2>
        <div className="grid grid-cols-3 gap-10 justify-center">
          <div className="cart-item w-auto h-[17rem]  text-white relative rounded-xl">
            <div className="overlay rounded-xl absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
            <NavLink to='/xyz'>
              <img srcSet="/laptop-img.jpg 2x" alt="" className="w-full object-cover h-full rounded-xl " />
              <div className="content absolute inset-0 p-5 rounded-xl">
                <div className="flex justify-between">
                  <Link to='/abc' className="py-1 px-2 rounded-xl bg-[#F3EDFF] text-[#6B6B6B]">Knowledge</Link>
                  <div className="text-white flex justify-between items-center gap-2">
                    <span>Mar 23</span>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                      <circle cx="3" cy="3" r="3" fill="#F8F9FA" />
                    </svg></span>
                    <span>Andiez Le</span>
                  </div>
                </div>
                <p className="text-xl font-medium tracking-wide leading-7 pt-5">This revision improves the sentence structure and conveys the idea more effectively.</p>
              </div>
            </NavLink>
          </div>
          <div className="cart-item w-auto h-[17rem]  text-white relative rounded-xl">
            <div className="overlay rounded-xl absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
            <NavLink className=''>
              <img srcSet="/laptop-img.jpg 2x" alt="" className="w-full object-cover h-full rounded-xl " />
              <div className="content absolute inset-0 p-5 rounded-xl">
                <div className="flex justify-between">
                  <Link className="py-1 px-2 rounded-xl bg-[#F3EDFF] text-[#6B6B6B]">Knowledge</Link>
                  <div className="text-white flex justify-between items-center gap-2">
                    <span>Mar 23</span>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                      <circle cx="3" cy="3" r="3" fill="#F8F9FA" />
                    </svg></span>
                    <span>Andiez Le</span>
                  </div>
                </div>
                <p className="text-xl font-medium tracking-wide leading-7 pt-5">This revision improves the sentence structure and conveys the idea more effectively.</p>
              </div>
            </NavLink>
          </div>
          <div className="cart-item w-auto h-[17rem]  text-white relative rounded-xl">
            <div className="overlay rounded-xl absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
            <NavLink className=''>
              <img srcSet="/laptop-img.jpg 2x" alt="" className="w-full object-cover h-full rounded-xl " />
              <div className="content absolute inset-0 p-5 rounded-xl">
                <div className="flex justify-between">
                  <Link className="py-1 px-2 rounded-xl bg-[#F3EDFF] text-[#6B6B6B]">Knowledge</Link>
                  <div className="text-white flex justify-between items-center gap-2">
                    <span>Mar 23</span>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                      <circle cx="3" cy="3" r="3" fill="#F8F9FA" />
                    </svg></span>
                    <span>Andiez Le</span>
                  </div>
                </div>
                <p className="text-xl font-medium tracking-wide leading-7 pt-5">This revision improves the sentence structure and conveys the idea more effectively.</p>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example of error boundary
export default withErrorBoundary(HomeFeature, {
  FallbackComponent: (
    <p className="p-3 text-red-500 bg-red-100">
      Look like this component error
    </p>
  ),
});
