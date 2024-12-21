import React from 'react';
import Layout from "@/components/layout";
import Post from "@/components/cards/post";
import GoBack from "@/components/navigation/go-back";

const Page = () => {
  return (
    <Layout>
      <GoBack wrapperStyle={"mt-4 ml-2"} />
      <Post labelType={"success"} isSuccess={true}  />
    </Layout>
  );
};

export default Page;
