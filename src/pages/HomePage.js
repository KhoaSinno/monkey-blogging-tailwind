import HomeBanner from 'Module/Home/HomeBanner';
import Header from 'components/layout/Header';
import Layout from 'components/layout/Layout';
import React from 'react';

const HomePage = () => {
    return (
        <div>
            <Layout>
                <HomeBanner></HomeBanner>
            </Layout>
        </div>
    );
};

export default HomePage;