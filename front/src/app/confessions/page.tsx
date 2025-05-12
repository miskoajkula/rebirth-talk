// "use client"
//
// import React from 'react';
// import Layout from "@/components/layout";
// import PostFilters from "@/components/filters/post-filters";
// import PostCard, { labelMap } from "@/components/cards/post";
//
// const Confessions = () => {
//
//   return (
//     <Layout>
//       <PostFilters/>
//       {
//         Object.keys(labelMap).map((el, i) => {
//           return <PostCard key={i} labelType={el as keyof typeof labelMap}/>
//         })
//       }
//     </Layout>
//   );
// };
//
// export default Confessions;

"use client";

import React from "react";
import Layout from "@/components/layout";
import PostFilters from "@/components/filters/post-filters";
import PostCard, { labelMap } from "@/components/cards/post";

const Confessions = () => {
  return (
    <Layout>
      <div className="min-h-screen py-12 px-4 relative">
        <div
          className={
            "bg-gradient-to-br from-indigo-50 to-purple-50 absolute left-0 top-0 w-full h-[100vh]"
          }
        />
        <div className="mx-auto max-w-4xl bg-white rounded-3xl p-6 shadow-xl relative">
          {/* Sticky Filters */}
          <div className="sticky top-0 bg-white pb-6 z-20">
            <PostFilters />
          </div>

          {/* Confession Cards */}
          <div className="flex flex-col divide-y divide-gray-200 ">
            {Object.keys(labelMap).map((key, idx) => (
              <div key={idx} className="py-6">
                <PostCard labelType={key as keyof typeof labelMap} />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8">
            <button className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition">
              Load More
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Confessions;
