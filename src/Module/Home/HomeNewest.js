import PostNewestItem from "Module/Post/PostNewestItem";
import Heading from "components/layout/Heading";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";

const HomeNewest = () => {
  const [postNewest, setPostNewest] = useState([]);

  //side effect
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", false),
      limit(4)
    );
    onSnapshot(queries, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostNewest(results);
    });
  }, []);
  if (postNewest.length <= 0) return null;
  const [firstPost, ...restPost] = postNewest;
  return (
    <div className="homeNewest-container mb-10">
      <div className="container">
        <Heading>Newest</Heading>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 justify-center">
          <PostNewestItem heightImg="h-[500px]" data={firstPost} imageFull={true}></PostNewestItem>
          <div className="grid grid-rows-3 gap-y-7 bg-[#F3EDFF] px-6 py-5 rounded-xl">
            {restPost.length > 0 && restPost.map((post) =>
              <PostNewestItem key={v4()} typeDirection='row' data={post}></PostNewestItem>
            )}
          </div>
        </div>

        {/* Last */}
        {/* <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:gap-10 py-14 ">
          <PostNewestItem heightImg='200px'></PostNewestItem>
          <PostNewestItem heightImg='200px'></PostNewestItem>
          <PostNewestItem heightImg='200px'></PostNewestItem>
          <PostNewestItem heightImg='200px'></PostNewestItem>
        </div>  */}
      </div>
    </div >
  );
};

export default HomeNewest;