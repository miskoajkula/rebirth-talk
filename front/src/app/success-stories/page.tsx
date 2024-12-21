import React from 'react';
import Layout from "@/components/layout";
import PostFilters from "@/components/filters/post-filters";
import PostCard from "@/components/cards/post";

const Page = () => {
  return (
    <Layout>
      <PostFilters/>
      {
        new Array(300).fill(0).map((_, i) => <PostCard key={i} isSuccess={true} labelType={"success"}/>)
      }
    </Layout>
  );
};

export default Page;
