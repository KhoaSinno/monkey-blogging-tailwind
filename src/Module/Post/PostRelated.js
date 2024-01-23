import Heading from "components/layout/Heading";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import PostNewestItem from "./PostNewestItem";

const PostRelated = ({ categoryId = "" }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const docRef = query(
      collection(db, "posts"),
      where("category.id", "==", categoryId)
    );
    onSnapshot(docRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, [categoryId]);
  if (!categoryId || posts.length <= 0) return null;
  return (
    <div className="post-related">
      <Heading>Relation post</Heading>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:gap-10 py-3">
        {posts.map((item) => (
          <PostNewestItem key={item.id} data={item} heightImg='200px' ></PostNewestItem>
        ))}
      </div>
    </div>
  );
};

export default PostRelated;
