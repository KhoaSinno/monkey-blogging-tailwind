import PostFeatureItem from "Module/Post/PostFeatureItem";
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
import { withErrorBoundary } from "react-error-boundary";
import { Link, NavLink } from "react-router-dom";

const HomeFeature = () => {
  return (
    <div className="homeFeature-container mb-10">
      <div className="container">
        <Heading>Newest</Heading>
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
