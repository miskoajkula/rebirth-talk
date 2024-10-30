"use client"

import React from 'react';
import Layout from "@/components/layout";
import PostFilters from "@/components/filters/post-filters";
import PostCard, { labelMap } from "@/components/cards/post";

const Page = () => {

  return (
    <Layout>
      <PostFilters/>
      {
        Object.keys(labelMap).map((el, i) => {
          return <PostCard key={i} labelType={el as keyof typeof labelMap}/>
        })
      }
    </Layout>
  );
};

export default Page;
