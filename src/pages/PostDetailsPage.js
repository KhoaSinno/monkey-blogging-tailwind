import styled from "styled-components";
import React, { useEffect, useState } from "react";
import NotFoundPage from "./NotFoundPage";
import Layout from "components/layout/Layout";
import { Link, useParams } from "react-router-dom";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuth } from "contexts/auth-context";
import { userRole } from "utils/constants";
import PostImage from "Module/Post/PostImage";
import PostCategory from "Module/Post/PostCategory";
import PostMeta from "Module/Post/PostMeta";
import AuthorBox from "components/author/AuthorBox";
import PostRelated from "Module/Post/PostRelated";
// import PostRelated from "Module/Post/PostRelated";
const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      /* grid-template-columns: auto auto ; */
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px auto;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 100%;
        height: auto;
      }
    }
  }
`;

const PostDetailsPage = () => {
  const { slug } = useParams()
  console.log("🚀 ~ PostDetailsPage ~ slug:", slug)
  const [postInfo, setPostInfo] = useState({});
  console.log("🚀 ~ PostDetailsPage ~ postInfo:", postInfo)
  const { user } = postInfo
  // side effect 
  useEffect(() => {
    async function fetData() {
      if (!slug) return
      const colRef = query(collection(db, 'posts'), where('slug', '==', slug))
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() && setPostInfo(doc.data())
        })
      })
    }
    fetData()
  }, [slug]);

  if (!user) return null
  if (!slug && postInfo.title) return <NotFoundPage></NotFoundPage>
  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className="container">
          <div className="post-header">
            <PostImage
              srcSet={postInfo?.image}
              classContainer='w-[85%] h-[420px] lg:w-[60%] lg:h-[500px]'
              classImg='absolute'
            ></PostImage>
            <div className="post-info">
              <PostCategory className="mb-6" to='/'>
                {postInfo.category?.name}
              </PostCategory>
              <h1 className="post-heading">{postInfo.title}</h1>
              <PostMeta data={postInfo.user} createdAt={postInfo.createdAt} typeColor="secondary"></PostMeta>
              {/* Check if user role is ADMIN then can edit the post */}
              <Link
                to={`/manage/update-post?id=${postInfo.id}`}
                className="inline-block px-4 py-2 mt-5 text-sm border border-gray-400 rounded-md"
              >
                Edit post
              </Link>
            </div>
          </div>
          <div className="post-content">
            <div
              className="entry-content"
              // Prevent XSS Attack recommend from React Docs
              dangerouslySetInnerHTML={{
                __html: postInfo?.content || "",
              }}
            ></div>
            <AuthorBox userId={user.id}></AuthorBox>
          </div>
          <PostRelated categoryId={postInfo?.category?.id}></PostRelated>
        </div>
      </Layout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
