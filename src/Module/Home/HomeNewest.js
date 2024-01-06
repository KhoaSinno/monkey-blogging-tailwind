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
        <h2 className="heading-before text-[#3A1097]">Newest</h2>
        <div className="grid grid-cols-2 gap-10 justify-center">
          <div className="cart-item w-auto h-[350px] text-white relative rounded-xl">
            <div className="overlay rounded-xl absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
            <NavLink className=''>
              <img srcSet="/laptop-img.jpg 2x" alt="" className="w-full object-cover h-full rounded-xl " />
              <div className="content text-[#232323] p-5 rounded-xl">
                <div className="flex">
                  <Link className="py-1 px-2 rounded-xl bg-[#F3EDFF] text-[#6B6B6B]">Knowledge</Link>
                </div>
                <p className="text-xl font-medium tracking-wide leading-7 pt-5">This revision improves the sentence structure and conveys the idea more effectively.</p>
                <div className="text-[#232323] flex justify-start items-center gap-3 pt-5">
                  <span>Mar 23</span>
                  <span><svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                    <circle cx="3" cy="3" r="3" fill="#232323" />
                  </svg></span>
                  <span>Andiez Le</span>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="grid grid-rows-3 gap-y-7 bg-[#F3EDFF] px-6 py-5 rounded-xl">
            <div className="cart-item-row h-[180px] overflow-y-auto ">
              <NavLink className='flex gap-x-3'>
                <div className="w-1/3 max-h-[125px] mt-[8%]">
                  <img srcSet="/laptop-img.jpg 2x" alt="" className="w-full object-cover h-full rounded-xl " />
                </div>
                <div className="w-2/3">
                  <Link className="py-1 px-2 rounded-xl bg-[#FFF] text-[#6B6B6B]">Knowledge</Link>
                  <p className="text-xl font-medium tracking-wide leading-7 py-3">This revision improves the sentence structure and conveys the idea more effectively. This revision improves the sentence structure and conveys the idea more effectively.</p>
                  <div className="text-[#6B6B6B] flex justify-start items-center gap-2">
                    <span>Mar 23</span>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                      <circle cx="3" cy="3" r="3" fill="#B1B5C3" />
                    </svg></span>
                    <span>Andiez Le</span>
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="cart-item-row h-[180px] overflow-y-auto">
              <NavLink className='flex gap-x-3'>
                <div className="w-1/3 max-h-[125px] mt-[8%]">
                  <img srcSet="/laptop-img.jpg 2x" alt="" className="w-full object-cover h-full rounded-xl " />
                </div>
                <div className="w-2/3">
                  <Link className="py-1 px-2 rounded-xl bg-[#FFF] text-[#6B6B6B]">Knowledge</Link>
                  <p className="text-xl font-medium tracking-wide leading-7 py-3">This revision improves the sentence structure and conveys the idea more effectively. This revision improves the sentence structure and conveys the idea more effectively.</p>
                  <div className="text-[#6B6B6B] flex justify-start items-center gap-2">
                    <span>Mar 23</span>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                      <circle cx="3" cy="3" r="3" fill="#B1B5C3" />
                    </svg></span>
                    <span>Andiez Le</span>
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="cart-item-row h-[180px] overflow-y-auto">
              <NavLink className='flex gap-x-3'>
                <div className="w-1/3 max-h-[125px] mt-[8%]">
                  <img srcSet="/laptop-img.jpg 2x" alt="" className="w-full object-cover h-full rounded-xl " />
                </div>
                <div className="w-2/3">
                  <Link className="py-1 px-2 rounded-xl bg-[#FFF] text-[#6B6B6B]">Knowledge</Link>
                  <p className="text-xl font-medium tracking-wide leading-7 py-3">This revision improves the sentence structure and conveys the idea more effectively. This revision improves the sentence structure and conveys the idea more effectively.</p>
                  <div className="text-[#6B6B6B] flex justify-start items-center gap-2">
                    <span>Mar 23</span>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                      <circle cx="3" cy="3" r="3" fill="#B1B5C3" />
                    </svg></span>
                    <span>Andiez Le</span>
                  </div>
                </div>
              </NavLink>
            </div>

          </div>
        </div>
        {/* last */}
        <div className="grid  grid-cols-4 gap-10 py-14">
          <div className="cart-item w-auto  text-white  rounded-xl">
            <NavLink className=''>
              <div className="relative">
                <div className="overlay rounded-xl absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                <img srcSet="/laptop-img.jpg 2x" alt="" className="w-full object-cover h-[200px] rounded-xl " />
              </div>
              <div className="content text-[#232323] p-3 rounded-xl">
                <div className="flex ">
                  <Link className="py-1 px-2 rounded-xl bg-[#F3EDFF] text-[#6B6B6B]">Knowledge</Link>
                </div>
                <p className="text-md font-medium tracking-wide leading-6 pt-3">This revision improves the sentence structure and conveys the idea more effectively. </p>
                <div className="text-[#232323] flex justify-start items-center gap-3 pt-3">
                  <span>Mar 23</span>
                  <span><svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                    <circle cx="3" cy="3" r="3" fill="#232323" />
                  </svg></span>
                  <span>Andiez Le</span>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="cart-item w-auto  text-white  rounded-xl">
            <NavLink className=''>
              <div className="relative">
                <div className="overlay rounded-xl absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                <img srcSet="/laptop-img.jpg 2x" alt="" className="w-full object-cover h-[200px] rounded-xl " />
              </div>
              <div className="content text-[#232323] p-3 rounded-xl">
                <div className="flex ">
                  <Link className="py-1 px-2 rounded-xl bg-[#F3EDFF] text-[#6B6B6B]">Knowledge</Link>
                </div>
                <p className="text-md font-medium tracking-wide leading-6 pt-3">This revision improves the sentence structure and conveys the idea more effectively.</p>
                <div className="text-[#232323] flex justify-start items-center gap-3 pt-3">
                  <span>Mar 23</span>
                  <span><svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                    <circle cx="3" cy="3" r="3" fill="#232323" />
                  </svg></span>
                  <span>Andiez Le</span>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="cart-item w-auto  text-white  rounded-xl">
            <NavLink className=''>
              <div className="relative">
                <div className="overlay rounded-xl absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                <img srcSet="/laptop-img.jpg 2x" alt="" className="w-full object-cover h-[200px] rounded-xl " />
              </div>
              <div className="content text-[#232323] p-3 rounded-xl">
                <div className="flex ">
                  <Link className="py-1 px-2 rounded-xl bg-[#F3EDFF] text-[#6B6B6B]">Knowledge</Link>
                </div>
                <p className="text-md font-medium tracking-wide leading-6 pt-3">This revision improves the sentence structure and conveys the idea more effectively.</p>
                <div className="text-[#232323] flex justify-start items-center gap-3 pt-3">
                  <span>Mar 23</span>
                  <span><svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                    <circle cx="3" cy="3" r="3" fill="#232323" />
                  </svg></span>
                  <span>Andiez Le</span>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="cart-item w-auto  text-white  rounded-xl">
            <NavLink className=''>
              <div className="relative">
                <div className="overlay rounded-xl absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                <img srcSet="/laptop-img.jpg 2x" alt="" className="w-full object-cover h-[200px] rounded-xl " />
              </div>
              <div className="content text-[#232323] p-3 rounded-xl">
                <div className="flex ">
                  <Link className="py-1 px-2 rounded-xl bg-[#F3EDFF] text-[#6B6B6B]">Knowledge</Link>
                </div>
                <p className="text-md font-medium tracking-wide leading-6 pt-3">This revision improves the sentence structure and conveys the idea more effectively.</p>
                <div className="text-[#232323] flex justify-start items-center gap-3 pt-3">
                  <span>Mar 23</span>
                  <span><svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                    <circle cx="3" cy="3" r="3" fill="#232323" />
                  </svg></span>
                  <span>Andiez Le</span>
                </div>
              </div>
            </NavLink>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomeNewest;