import PostNewestItem from 'Module/Post/PostNewestItem';
import Heading from 'components/layout/Heading';
import Layout from 'components/layout/Layout';
import { db } from 'firebase-app/firebase-config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

const BlogPage = () => {
    const [posts, setPosts] = useState({});
    console.log("🚀 ~ BlogPage ~ posts:", posts)

    // side effect
    useEffect(() => {
        const colRef = collection(db, "posts");

        onSnapshot(colRef, (snapshot) => {
            const results = [];
            snapshot.forEach((doc) => {
                results.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setPosts(results);
        });
    }, []);
    if (!posts) return null
    return (
        <Layout>
            <div className="container">
                <div className='py-20'>
                    <Heading>List blog:</Heading>
                    <div className='grid grid-cols-2 gap-5 md:grid-cols-4 lg:gap-8 '>
                        {posts.length > 0 && posts.map((item) => (
                            <PostNewestItem key={item.id} data={item} heightImg='200px' ></PostNewestItem>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default BlogPage;