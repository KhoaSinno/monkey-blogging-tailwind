import PostFeatureItem from "Module/Post/PostFeatureItem";
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
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
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
