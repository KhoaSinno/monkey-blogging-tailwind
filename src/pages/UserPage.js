import PostNewestItem from 'Module/Post/PostNewestItem';
import Heading from 'components/layout/Heading';
import Layout from 'components/layout/Layout';
import { db } from 'firebase-app/firebase-config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";

const UserPage = () => {
    const { slug } = useParams()
    const [posts, setPosts] = useState({});
    console.log("🚀 ~ UserPage ~ posts:", posts)

    // side effect
    useEffect(() => {
        const colRef = collection(db, "posts");
        const queries = query(
            colRef,
            where("user.username", "==", slug),
        );
        onSnapshot(queries, (snapshot) => {
            const results = [];
            snapshot.forEach((doc) => {
                results.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setPosts(results);
        });
    }, [slug]);
    if (!posts) return null
    return (
        <Layout>
            <div className="container">
                <div className='py-20'>
                    <Heading>User of {posts.length > 0 ? posts[0 || 1].user?.username : 'list'}</Heading>
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

export default UserPage;