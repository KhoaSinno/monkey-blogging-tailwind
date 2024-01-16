import PostFeatureItem from "Module/Post/PostFeatureItem";
import Heading from "components/layout/Heading";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import React, { useEffect, useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { Link, NavLink } from "react-router-dom";

const HomeFeature = () => {
  const [postFeature, setPostFeature] = useState({});

  // useEffect(() => {
  //   const fetchPostFeature = async () => {
  //     const q = query(collection(db, "posts"), where("hot", "==", true), where('status', '==', 1), limit(3));
  //     const querySnapshot = await getDocs(q);
  //     const result = []
  //     querySnapshot.forEach((doc) => {
  //       result.push({ id: doc.id, ...doc.data() })
  //     });
  //     setPostFeature(result)
  //   }
  //   fetchPostFeature()
  // }, []);

  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true),
      limit(3)
    );
    onSnapshot(queries, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostFeature(results);
    });
  }, []);
  if (postFeature.length <= 0) return null;
  console.log('PostFeature: ', postFeature)
  return (
    <div className="homeFeature-container mb-10">
      <div className="container">
        <Heading>Newest</Heading>
        <div className="grid grid-cols-3 gap-10 justify-center">
          {postFeature.length > 0 && postFeature.map((post) =>
            <PostFeatureItem data={post} key={post.id}></PostFeatureItem>)}
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
