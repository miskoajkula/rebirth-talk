import React from 'react';
import Layout from "@/components/layout";
import PostCard from "@/components/cards/post";
import PostFilters from "@/components/filters/post-filters";

export default function Home() {
  return (

    <Layout>

      <PostFilters/>
      {
        new Array(300).fill(0).map((_, i) => <PostCard key={i}/>)
      }
    </Layout>

  );
}
