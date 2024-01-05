import HomeBanner from 'Module/Home/HomeBanner';
import HomeFeature from 'Module/Home/HomeFeature';
import HomeNewest from 'Module/Home/HomeNewest';
import Layout from 'components/layout/Layout';
import React from 'react';

const HomePage = () => {
    return (
        <div>
            <Layout>
                <HomeBanner></HomeBanner>
                <HomeFeature></HomeFeature>
                <HomeNewest></HomeNewest>
            </Layout>
        </div>
    );
};

export default HomePage;